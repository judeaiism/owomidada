'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth, UserData } from "@/hooks/useAuth"
import ProtectedRoute from '@/components/ProtectedRoute'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Camera, HelpCircle, MessageSquare, LogOut, Home } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import useProductStore from '@/stores/productStore';
import UserListingsTable from '@/components/UserListingsTable';

// Mock API calls
const mockApiCall = (data: any, delay = 1000) => new Promise((resolve) => setTimeout(() => resolve(data), delay));

// Verification URL - replace with your actual URL
const VERIFICATION_URL = "https://your-verification-url.com";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal-info")
  const [profileVerified, setProfileVerified] = useState(false)
  const [profilePicture, setProfilePicture] = useState("/images/placeholder-avatar.jpg")
  const { toast } = useToast();
  const { user, getUserData, logOut, updateProfilePicture } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const { items: userProducts, fetchUserProducts, hideProduct, unhideProduct, deleteProduct } = useProductStore();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setUserData(data);
          if (data.profilePicture) {
            setProfilePicture(data.profilePicture);
          }
        }
      }
    };
    fetchUserData();
  }, [user, getUserData]);

  useEffect(() => {
    if (user) {
      fetchUserProducts(user.uid);
    }
  }, [user, fetchUserProducts]);

  const handleChangePhoto = useCallback(async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to change your profile picture.",
        variant: "destructive"
      });
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          try {
            const newProfilePictureUrl = await updateProfilePicture(user.uid, file);
            setProfilePicture(newProfilePictureUrl);
            setUserData((prevData: any) => ({
              ...prevData,
              profilePicture: newProfilePictureUrl
            }));
            toast({
              title: "Profile picture updated",
              description: "Your new profile picture has been set successfully.",
            });
          } catch (error) {
            console.error('Error updating profile picture:', error);
            toast({
              title: "Error",
              description: "Failed to update profile picture. Please try again.",
              variant: "destructive"
            });
          }
        }
      }
    };
    input.click();
  }, [toast, user, updateProfilePicture]);

  const handleSupportRequest = useCallback(async () => {
    await mockApiCall({ success: true });
    toast({
      title: "Support request sent",
      description: "Our team will get back to you shortly.",
    })
  }, [toast]);

  const handleSignOut = async () => {
    try {
      await logOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleHideProduct = async (productId: string) => {
    try {
      await hideProduct(productId);
      toast({
        title: "Listing hidden",
        description: "The listing has been hidden from the homepage.",
      });
    } catch (error) {
      console.error('Error hiding product:', error);
      toast({
        title: "Error",
        description: "Failed to hide the listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUnhideProduct = async (productId: string) => {
    try {
      await unhideProduct(productId);
      toast({
        title: "Listing unhidden",
        description: "The listing is now visible on the homepage.",
      });
    } catch (error) {
      console.error('Error unhiding product:', error);
      toast({
        title: "Error",
        description: "Failed to unhide the listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      toast({
        title: "Listing deleted",
        description: "The listing has been permanently deleted.",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete the listing. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {userData?.firstName || 'User'}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleGoHome}>
              <Home className="mr-2 h-4 w-4" />
              Go to Homepage
            </Button>
            <Button variant="outline" onClick={handleSupportRequest}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
            {!profileVerified && (
              <Link href={VERIFICATION_URL} passHref>
                <Button>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Verify Profile
                </Button>
              </Link>
            )}
            {profileVerified && (
              <Badge variant="secondary">
                Verified Profile
              </Badge>
            )}
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profilePicture} alt="Profile Picture" />
                <AvatarFallback>{userData?.firstName?.[0]}{userData?.lastName?.[0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="mt-4" onClick={handleChangePhoto}>
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                <TabsTrigger value="seller-settings">Seller Settings</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
              </TabsList>
              <TabsContent value="personal-info">
                <PersonalInfoTab 
                  userData={userData || {} as UserData} 
                  setUserData={setUserData} 
                />
              </TabsContent>
              <TabsContent value="seller-settings">
                <SellerSettingsTab />
              </TabsContent>
              <TabsContent value="security">
                <SecurityTab />
              </TabsContent>
              <TabsContent value="preferences">
                <PreferencesTab />
              </TabsContent>
              <TabsContent value="listings">
                <Card>
                  <CardHeader>
                    <CardTitle>My Listings</CardTitle>
                    <CardDescription>View and manage your product listings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserListingsTable 
                      listings={userProducts} 
                      onHide={handleHideProduct}
                      onUnhide={handleUnhideProduct}
                      onDelete={handleDeleteProduct}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function PersonalInfoTab({ 
  userData, 
  setUserData 
}: { 
  userData: UserData, 
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>> 
}) {
  const { toast } = useToast();
  const { user, updateUserData } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    bio: ""
  });

  useEffect(() => {
    if (userData) {
      setPersonalInfo(prevInfo => ({
        firstName: userData.firstName || prevInfo.firstName,
        lastName: userData.lastName || prevInfo.lastName,
        displayName: userData.displayName || prevInfo.displayName,
        email: userData.email || prevInfo.email,
        phone: userData.phone || prevInfo.phone,
        dob: userData.dob || prevInfo.dob,
        gender: userData.gender || prevInfo.gender,
        bio: userData.bio || prevInfo.bio
      }));
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if all fields are filled
    const emptyFields = Object.entries(personalInfo)
      .filter(([key, value]) => value === "")
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast({
        title: "Incomplete form",
        description: `Please fill in the following fields: ${emptyFields.join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    try {
      if (user) {
        await updateUserData(user.uid, personalInfo);
        setUserData(prevData => {
          if (prevData === null) {
            // Include the id when creating a new UserData object
            return { id: user.uid, ...personalInfo };
          }
          // Include the existing id when updating
          return { ...prevData, ...personalInfo };
        });
        toast({
          title: "Personal information updated",
          description: "Your personal information has been saved successfully.",
        });
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      toast({
        title: "Error",
        description: "Failed to update personal information. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" name="firstName" value={personalInfo.firstName} onChange={handleChange} placeholder="John" required />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" name="lastName" value={personalInfo.lastName} onChange={handleChange} placeholder="Doe" required />
          </div>
        </div>
        <div>
          <Label htmlFor="displayName">Display Name *</Label>
          <Input id="displayName" name="displayName" value={personalInfo.displayName} onChange={handleChange} placeholder="JohnDoe123" required />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleChange} placeholder="john.doe@example.com" required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" value={personalInfo.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" required />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth *</Label>
          <Input id="dob" name="dob" type="date" value={personalInfo.dob} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="gender">Gender *</Label>
          <select id="gender" name="gender" value={personalInfo.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <Label htmlFor="bio">Bio *</Label>
          <Textarea id="bio" name="bio" value={personalInfo.bio} onChange={handleChange} placeholder="Tell us about yourself..." required />
        </div>
        <Button type="submit">Save Changes</Button>
      </form>
    </ScrollArea>
  )
}

function SellerSettingsTab() {
  const { toast } = useToast();
  const { user, updateSellerSettings, getUserData } = useAuth();
  const [sellerSettings, setSellerSettings] = useState({
    storeName: "",
    storeDescription: "",
    shippingPolicy: "",
    returnPolicy: "",
    storeLogo: "",
    storeBanner: ""
  });
  const [storeLogoFile, setStoreLogoFile] = useState<File | null>(null);
  const [storeBannerFile, setStoreBannerFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSellerSettings = async () => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData && userData.sellerSettings) {
            setSellerSettings(userData.sellerSettings);
          }
        } catch (error) {
          console.error('Error fetching seller settings:', error);
          toast({
            title: "Error",
            description: "Failed to load seller settings. Please try again.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSellerSettings();
  }, [user, getUserData, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSellerSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'logo' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      if (fileType === 'logo') {
        setStoreLogoFile(file);
      } else {
        setStoreBannerFile(file);
      }
    }
  };

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    const uploadTask = await uploadBytes(storageRef, file);
    return getDownloadURL(uploadTask.ref);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check if all fields are filled
    const emptyFields = Object.entries(sellerSettings)
      .filter(([key, value]) => value === "" && key !== 'storeLogo' && key !== 'storeBanner')
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      toast({
        title: "Incomplete form",
        description: `Please fill in all required fields.`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save seller settings.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      let updatedSettings = { ...sellerSettings };

      // Upload new logo if provided
      if (storeLogoFile) {
        const logoUrl = await uploadFile(storeLogoFile, `store_logos/${user.uid}`);
        updatedSettings.storeLogo = logoUrl;
      }

      // Upload new banner if provided
      if (storeBannerFile) {
        const bannerUrl = await uploadFile(storeBannerFile, `store_banners/${user.uid}`);
        updatedSettings.storeBanner = bannerUrl;
      }

      // Update seller settings in Firestore
      await updateSellerSettings(user.uid, updatedSettings);

      setSellerSettings(updatedSettings);
      setStoreLogoFile(null);
      setStoreBannerFile(null);

      toast({
        title: "Seller settings updated",
        description: "Your seller settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving seller settings:', error);
      toast({
        title: "Error",
        description: "Failed to save seller settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading seller settings...</div>;
  }

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="storeName">Store Name *</Label>
          <Input id="storeName" name="storeName" value={sellerSettings.storeName} onChange={handleChange} placeholder="My Awesome Store" required />
        </div>
        <div>
          <Label htmlFor="storeDescription">Store Description *</Label>
          <Textarea id="storeDescription" name="storeDescription" value={sellerSettings.storeDescription} onChange={handleChange} placeholder="Describe your store..." required />
        </div>
        <div>
          <Label htmlFor="storeLogo">Store Logo</Label>
          <Input id="storeLogo" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
          {sellerSettings.storeLogo && <img src={sellerSettings.storeLogo} alt="Store Logo" className="mt-2 max-w-xs" />}
        </div>
        <div>
          <Label htmlFor="storeBanner">Store Banner</Label>
          <Input id="storeBanner" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'banner')} />
          {sellerSettings.storeBanner && <img src={sellerSettings.storeBanner} alt="Store Banner" className="mt-2 max-w-xs" />}
        </div>
        <div>
          <Label htmlFor="shippingPolicy">Shipping Policy *</Label>
          <Textarea id="shippingPolicy" name="shippingPolicy" value={sellerSettings.shippingPolicy} onChange={handleChange} placeholder="Enter your shipping policy..." required />
        </div>
        <div>
          <Label htmlFor="returnPolicy">Return Policy *</Label>
          <Textarea id="returnPolicy" name="returnPolicy" value={sellerSettings.returnPolicy} onChange={handleChange} placeholder="Enter your return policy..." required />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Store Settings"}
        </Button>
      </form>
    </ScrollArea>
  )
}

function SecurityTab() {
  const { toast } = useToast();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }
    await mockApiCall({ success: true });
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handle2FAToggle = async () => {
    await mockApiCall({ success: true });
    setTwoFAEnabled(!twoFAEnabled);
    toast({
      title: `Two-Factor Authentication ${twoFAEnabled ? 'Disabled' : 'Enabled'}`,
      description: `Two-Factor Authentication has been ${twoFAEnabled ? 'disabled' : 'enabled'} for your account.`,
    });
  };

  const handleViewLogins = async () => {
    await mockApiCall({ success: true });
    toast({
      title: "Recent Logins",
      description: "Viewing recent login activity is not implemented in this demo.",
    });
  };

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <Label htmlFor="currentPassword">Current Password *</Label>
                <Input id="currentPassword" name="currentPassword" type="password" value={passwords.currentPassword} onChange={handlePasswordChange} required />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password *</Label>
                <Input id="newPassword" name="newPassword" type="password" value={passwords.newPassword} onChange={handlePasswordChange} required />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" value={passwords.confirmPassword} onChange={handlePasswordChange} required />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch id="2fa" checked={twoFAEnabled} onCheckedChange={handle2FAToggle} />
              <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Login Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={handleViewLogins}>View Recent Logins</Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}

function PreferencesTab() {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState<{
    email: boolean;
    sms: boolean;
    push: boolean;
  }>({
    email: false,
    sms: false,
    push: false,
  });

  const [consentSettings, setConsentSettings] = useState<{
    termsAndConditions: boolean;
    dataUseConsent: boolean;
    cookiesConsent: boolean;
  }>({
    termsAndConditions: false,
    dataUseConsent: false,
    cookiesConsent: false,
  });

  const handleNotificationChange = async (key: keyof typeof notificationSettings) => {
    await mockApiCall({ success: true });
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Notification preference updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${notificationSettings[key] ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleLegalAgreementChange = async (key: keyof typeof consentSettings) => {
    await mockApiCall({ success: true });
    setConsentSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast({
      title: "Legal agreement updated",
      description: `${key.split(/(?=[A-Z])/).join(" ")} ${consentSettings[key] ? 'revoked' : 'accepted'}.`,
    });
  };

  const handleSocialConnect = async (platform: string) => {
    await mockApiCall({ success: true });
    toast({
      title: `${platform} Connected`,
      description: `Your ${platform} account has been successfully connected.`,
    });
  };

  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(notificationSettings).map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  <Switch
                    id={key}
                    checked={notificationSettings[key as keyof typeof notificationSettings]}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, [key]: checked }))
                    }
                  />
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Legal Agreements and Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.keys(consentSettings).map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  <Switch
                    id={key}
                    checked={consentSettings[key as keyof typeof consentSettings]}
                    onCheckedChange={(checked) =>
                      setConsentSettings((prev) => ({ ...prev, [key]: checked }))
                    }
                  />
                  <Label htmlFor={key}>{key.split(/(?=[A-Z])/).join(" ")}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Social Media Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" onClick={() => handleSocialConnect('Facebook')}>Connect Facebook</Button>
              <Button variant="outline" className="w-full" onClick={() => handleSocialConnect('Twitter')}>Connect Twitter</Button>
              <Button variant="outline" className="w-full" onClick={() => handleSocialConnect('Instagram')}>Connect Instagram</Button>
              <Button variant="outline" className="w-full" onClick={() => handleSocialConnect('LinkedIn')}>Connect LinkedIn</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}