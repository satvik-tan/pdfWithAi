import React from "react";
import { ThemeProvider } from "./theme-provider";
import ThemeToggle from "./theme-toggle";
import UploadComponent from "./UploadComponent";
import AIAssistantCard from "./aiChat";

const AppLayout = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Document Assistant
            </h1>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
              <UploadComponent />
            </div>
            <div className="lg:col-span-1">
              <AIAssistantCard />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AppLayout;