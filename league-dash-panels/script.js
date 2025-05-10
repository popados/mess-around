import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

const tabs = ["Champions", "Items", "Summoners", "Games"];

export default function LoLDashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">League of Legends Dashboard</h1>
      <div className="flex items-center gap-2 mb-6">
        <Search className="text-gray-500" />
        <Input
          placeholder="Search champions, items, summoners, games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Tabs defaultValue="Champions" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Replace with actual content filtered by search */}
              {[...Array(8)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <p className="font-medium">
                      {tab} {i + 1}
                    </p>
                    <p className="text-sm text-gray-500">
                      Details for {tab.toLowerCase()} {i + 1}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
