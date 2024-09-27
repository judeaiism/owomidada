'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from "@/hooks/useAuth"
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
import { AlertCircle, Camera, HelpCircle, MessageSquare, LogOut } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'

// Mock API calls
const mockApiCall = (data: any, delay = 1000) => new Promise((resolve) => setTimeout(() => resolve(data), delay));

// Verification URL - replace with your actual URL
const VERIFICATION_URL = "https://your-verification-url.com";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal-info")
  const [profileVerified, setProfileVerified] = useState(false)
  const [profilePicture, setProfilePicture] = useState("/placeholder-avatar.jpg")
  const { toast } = useToast();
  const { user, getUserData, logOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setUserData(data);
        }
      }
    };
    fetchUserData();
  }, [user, getUserData]);

  const handleChangePhoto = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.files) {
        const file = target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = (e.target as FileReader).result;
            if (typeof result === 'string') {
              setProfilePicture(result);
              toast({
                title: "Profile picture updated",
                description: "Your new profile picture has been set successfully.",
              })
            }
          };
          reader.readAsDataURL(file);
        }
      }
    };
    input.click();
  }, [toast]);

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

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <div className="flex items-center space-x-4">
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
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="mt-4" onClick={handleChangePhoto}>
              <Camera className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
              <TabsTrigger value="seller-settings">Seller Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="personal-info">
              <PersonalInfoTab />
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
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

function PersonalInfoTab() {
  const { toast } = useToast();
  const { user, getUserData } = useAuth();
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
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setPersonalInfo({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            displayName: data.displayName || "",
            email: data.email || "",
            phone: data.phone || "",
            dob: data.dob || "",
            gender: data.gender || "",
            bio: data.bio || ""
          });
        }
      }
    };
    fetchUserData();
  }, [user, getUserData]);

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

    await mockApiCall({ success: true });
    toast({
      title: "Personal information updated",
      description: "Your personal information has been saved successfully.",
    })
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
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
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
  const [sellerSettings, setSellerSettings] = useState({
    storeName: "",
    storeDescription: "",
    shippingPolicy: "",
    returnPolicy: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSellerSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all fields are filled
    const emptyFields = Object.entries(sellerSettings)
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

    await mockApiCall({ success: true });
    toast({
      title: "Seller settings updated",
      description: "Your seller settings have been saved successfully.",
    })
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulating file upload
      await mockApiCall({ success: true });
      toast({
        title: `${fileType} uploaded`,
        description: `Your ${fileType.toLowerCase()} has been uploaded successfully.`,
      })
    }
  };

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
          <Label htmlFor="storeLogo">Store Logo *</Label>
          <Input id="storeLogo" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'Logo')} required />
        </div>
        <div>
          <Label htmlFor="storeBanner">Store Banner *</Label>
          <Input id="storeBanner" type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'Banner')} required />
        </div>
        <div>
          <Label htmlFor="shippingPolicy">Shipping Policy *</Label>
          <Textarea id="shippingPolicy" name="shippingPolicy" value={sellerSettings.shippingPolicy} onChange={handleChange} placeholder="Enter your shipping policy..." required />
        </div>
        <div>
          <Label htmlFor="returnPolicy">Return Policy *</Label>
          <Textarea id="returnPolicy" name="returnPolicy" value={sellerSettings.returnPolicy} onChange={handleChange} placeholder="Enter your return policy..." required />
        </div>
        <Button type="submit">Save Store Settings</Button>
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