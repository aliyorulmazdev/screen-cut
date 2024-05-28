"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CutterComponent() {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedSubModel, setSelectedSubModel] = useState(null);

  const devices = ['iPhone 14', 'iPhone 13', 'iPhone 12'];
  const subModels = ['Standart', 'Pro', 'Promax'];

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
  };

  const handleSubModelClick = (subModel) => {
    setSelectedSubModel(subModel);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between px-4 py-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <ScissorsIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">ScreenCut</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Device ID: 1234567890</span>
          <SettingsIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </div>
      </header>
      <main className="flex-1 p-10">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Cihaz Modelini Seçin</h2>
            <Input
              className="w-1/3 px-4 py-2 rounded-lg bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Ara..."
              type="search"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {devices.map((device) => (
              <div
                key={device}
                className={`flex flex-col items-center justify-center p-4 rounded-lg shadow cursor-pointer ${selectedDevice === device ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
                onClick={() => handleDeviceClick(device)}
              >
                <PhoneIcon className={`w-12 h-12 ${selectedDevice === device ? 'text-green-800 dark:text-green-200' : 'text-gray-800 dark:text-gray-200'}`} />
                <span className="mt-2 text-sm font-medium">{device}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Alt Modelini Seçin
            </h2>
            <Input
              className="w-1/3 px-4 py-2 rounded-lg bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Ara..."
              type="search"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {subModels.map((subModel) => (
              <div
                key={subModel}
                className={`flex flex-col items-center justify-center p-4 rounded-lg shadow cursor-pointer ${selectedSubModel === subModel ? 'bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
                onClick={() => handleSubModelClick(subModel)}
              >
                <PhoneIcon className={`w-12 h-12 ${selectedSubModel === subModel ? 'text-green-800 dark:text-green-200' : 'text-gray-800 dark:text-gray-200'}`} />
                <span className="mt-2 text-sm font-medium">{subModel}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Talimatlar</h2>
          <div className="mt-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <ol className="list-decimal list-inside text-gray-800 dark:text-gray-200">
              <li>iPhone'u yüzü aşağı düz bir yüzeye yerleştirin.</li>
              <li>Kesme aletini ekran kenarlarına hizalayın.</li>
              <li>Hafif bir basınç uygulayın ve aleti ekran kenarları boyunca hareket ettirin.</li>
              <li>Ekran tamamen ayrılana kadar işlemi tekrarlayın.</li>
            </ol>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Güvenlik Kuralları</h2>
          <div className="mt-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-200">
              <li>Koruyucu eldiven ve gözlük kullanın.</li>
              <li>Çalışma alanını temiz ve iyi aydınlatılmış tutun.</li>
              <li>Aşırı güç uygulamaktan kaçının.</li>
              <li>Aleti çocuklardan uzak tutun.</li>
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Kesim Cihazının Durumu</h2>
          <div className="mt-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex flex-col items-center justify-center">
              <ScissorsIcon className="w-16 h-16 text-gray-800 dark:text-gray-200" />
              <span className="mt-2 text-sm font-medium text-gray-800 dark:text-gray-200">Origin : XY</span>
              <div className="flex items-center mt-2">
                <CircleCheckIcon className="w-6 h-6 text-green-500" />
                <span className="ml-2 text-sm font-medium text-green-500">Ready</span>
              </div>
            </div>
          </div>
        </div>
        <Button className="w-full py-2 rounded-lg">Kesmeye Başla</Button>
      </main>
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ScissorsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
