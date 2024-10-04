import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Shop</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-colors">Deals</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Gift Cards</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Support</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Product Recalls</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Accessibility</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">About Us</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-900 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Press Releases</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Investor Relations</a></li>
            <li><a href="#" className="hover:text-gray-900 transition-colors">Corporate Responsibility</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Stay Connected</h2>
          <p className="text-sm">Get exclusive deals, news, and updates.</p>
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit" variant="outline">Subscribe</Button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
              <Youtube size={20} />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">&copy; 2024 Owomida. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}