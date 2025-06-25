
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, User, Phone, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface ProfileCompletionProps {
  onComplete: () => void;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    state: '',
    age: ''
  });
  const [loading, setLoading] = useState(false);
  const { updateProfile, user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        district: formData.district,
        state: formData.state,
        age: parseInt(formData.age)
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        });
      } else {
        toast({
          title: "Profile Updated",
          description: "Your profile has been completed successfully!"
        });
        onComplete();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-12 h-12 text-purple-400 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CYREX
              </h1>
            </div>
            <p className="text-gray-300 mb-2">
              Complete Your Profile
            </p>
            <p className="text-gray-400 text-sm">
              We need a few details to personalize your experience
            </p>
          </div>

          {/* Profile Form */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="age" className="text-white">Age</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your age"
                      min="13"
                      max="100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="state" className="text-white">State</Label>
                  <Select onValueChange={(value) => handleInputChange('state', value)} required>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state} className="text-white hover:bg-slate-600">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="district" className="text-white">District</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="district"
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your district"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {loading ? 'Saving...' : 'Complete Profile'}
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
