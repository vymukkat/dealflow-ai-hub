import { Youtube, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const initialBlocked = ["Gambling", "Alcohol", "Tobacco"];

export default function SettingsPage() {
  const [blocked, setBlocked] = useState(initialBlocked);

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader><CardTitle className="text-lg">Creator Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Niche</Label>
            <Input defaultValue="Hockey" />
          </div>
          <div className="space-y-2">
            <Label>Deal Minimum</Label>
            <Input type="number" defaultValue="2000" />
          </div>
          <div className="space-y-2">
            <Label>Preferred Format</Label>
            <Select defaultValue="integration">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="integration">Integration</SelectItem>
                <SelectItem value="dedicated">Dedicated</SelectItem>
                <SelectItem value="mention">Mention</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Avoid Categories</Label>
            <div className="flex flex-wrap gap-2">
              {blocked.map((c) => (
                <Badge key={c} variant="secondary" className="flex items-center gap-1">
                  {c}
                  <button onClick={() => setBlocked(blocked.filter((b) => b !== c))}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Outreach Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Affinity Threshold</Label>
            <Slider defaultValue={[50]} max={100} step={1} />
            <p className="text-xs text-muted-foreground">50%</p>
          </div>
          <div className="space-y-2">
            <Label>Daily Email Limit</Label>
            <Input type="number" defaultValue="30" />
          </div>
          <div className="flex items-center justify-between">
            <Label>Auto-send</Label>
            <div className="flex items-center gap-2">
              <Switch />
              <span className="text-xs text-red-500 font-medium">OFF</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Re-contact Window</Label>
            <Input defaultValue="90 days" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Account</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Youtube className="h-5 w-5 text-red-500" />
            <span className="font-semibold">Wes Mukkati</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">YouTube Analytics connected</span>
          </div>
          <Button variant="destructive" size="sm">Disconnect</Button>
        </CardContent>
      </Card>
    </div>
  );
}
