"use client"

import { Settings, Bell, Lock, Palette, Save } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    emailReports: true,
    shelfLifeUnits: "days",
    currency: "INR",
  })

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center space-x-3 mb-4">
            <Palette className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Appearance</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Theme</label>
              <select value={settings.theme} onChange={e => setSettings(s => ({ ...s, theme: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Shelf Life Units</label>
              <select value={settings.shelfLifeUnits} onChange={e => setSettings(s => ({ ...s, shelfLifeUnits: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm">
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Currency</label>
              <select value={settings.currency} onChange={e => setSettings(s => ({ ...s, currency: e.target.value }))}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm">
                <option value="INR">₹ Indian Rupee</option>
                <option value="USD">$ US Dollar</option>
                <option value="EUR">€ Euro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input type="checkbox" checked={settings.notifications} onChange={e => setSettings(s => ({ ...s, notifications: e.target.checked }))} className="rounded" />
            <span className="text-sm text-gray-600">Enable all notifications</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer mt-3">
            <input type="checkbox" checked={settings.emailReports} onChange={e => setSettings(s => ({ ...s, emailReports: e.target.checked }))} className="rounded" />
            <span className="text-sm text-gray-600">Email monthly reports</span>
          </label>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Security</h3>
          </div>
          <button className="w-full border border-gray-200 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
            Change Password
          </button>
          <button className="w-full mt-3 border border-gray-200 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
            Two-Factor Authentication
          </button>
        </div>

        {/* Save */}
        <button className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 rounded-xl font-semibold">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  )
}
