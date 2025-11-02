import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: true,        
        tabBarShowLabel: false
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="addNote"
        options={{
          title: 'Create New Note',
          tabBarIcon: ({ color }) => <Ionicons size={20} name="add-circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
