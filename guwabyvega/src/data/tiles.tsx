import React from 'react';
import {ImageSourcePropType, StyleSheet, Text} from 'react-native';

export interface TileData {
  id: string;
  label: string;
  accessibilityLabel: string;
  description?: string | React.JSX.Element;
  icon: ImageSourcePropType;
  timeSpentProgress?: string;
  locationId?: string;
}

const descStyles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
});

export const tiles: TileData[] = [
  {
    id: 'home',
    label: 'Pet\nFinder',
    accessibilityLabel: 'Home Pet Finder',
    description: (
      <>
        Live <Text style={descStyles.bold}>Pet Tracker</Text> & path history
        animation on Fire TV.
      </>
    ),
    icon: require('../assets/home.png'),
    timeSpentProgress: 'Current • 10m ago',
    locationId: 'loc-home',
  },
  {
    id: 'loc-park',
    label: 'Nearest\nPark',
    accessibilityLabel: 'Nearest Park Location',
    description: (
      <>
        <Text style={descStyles.bold}>Central Bark Park</Text> — Visited 08:30
        AM. Total stay: 45 minutes.
      </>
    ),
    icon: require('../assets/get-started.png'),
    timeSpentProgress: '45m stay',
    locationId: 'loc-park',
  },
  {
    id: 'loc-vet',
    label: 'Nearest\nVet',
    accessibilityLabel: 'Nearest Veterinary Clinic',
    description: (
      <>
        <Text style={descStyles.bold}>Pet Care Clinic</Text> — Routine vet visit
        at 09:30 AM. Total stay: 20 minutes.
      </>
    ),
    icon: require('../assets/get-started.png'),
    timeSpentProgress: '20m stay',
    locationId: 'loc-vet',
  },
  {
    id: 'get-started',
    label: 'Guwaby',
    accessibilityLabel: 'Guwaby Project',
    description: (
      <>
        Real-time UWB Pet Tracking & Path History for Vega Fire TV This is the{' '}
        <Text style={descStyles.bold}>Pet tracker</Text> App for Vega.
        {'\n'}For mobile control scan the QR Code.
      </>
    ),
    icon: require('../assets/get-started.png'),
  },
  {
    id: 'debug',
    label: 'Test &\nDebug',
    accessibilityLabel: 'Test and Debug',
    description:
      "Press 'd' in the Metro terminal for the developer menu, or debug via Chrome Dev Tools in Vega Studio.",
    icon: require('../assets/debug.png'),
  },
  {
    id: 'learn-more',
    label: 'Learn\nmore',
    accessibilityLabel: 'Learn more',
    description: (
      <>
        Read the docs at{' '}
        <Text style={descStyles.bold}>developer.amazon.com</Text> or join the
        community forums.
      </>
    ),
    icon: require('../assets/learn-more.png'),
  },
];
