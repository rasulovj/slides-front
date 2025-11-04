"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Settings = () => {
  const [name, setName] = useState("Jamshidbek");
  const [email, setEmail] = useState("jamshidbek@example.com");
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);
  const [avatar, setAvatar] = useState("/avatars/default.png");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setAvatar(imgUrl);
    }
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="shadow-md border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            User Settings
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile Section */}
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatar} alt="User Avatar" />
              <AvatarFallback>JB</AvatarFallback>
            </Avatar>
            <div>
              <Label
                htmlFor="avatar"
                className="cursor-pointer text-sm text-blue-600"
              >
                Change Photo
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="uz">O‘zbekcha</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <Label className="text-base font-medium">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Toggle light or dark theme
              </p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>

          {/* Save Button */}
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button onClick={handleSave} className="w-full mt-4">
              Save Changes
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Settings;
