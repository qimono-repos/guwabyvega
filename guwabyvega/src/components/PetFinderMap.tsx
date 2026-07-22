import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Image, Text, Animated, Easing} from 'react-native';

export interface LocationWaypoint {
  id: string;
  name: string;
  type: 'home' | 'park' | 'vet';
  timeSpent: string;
  timestamp: string;
  xPercent: number; // 0 - 100% position on map
  yPercent: number;
  description: string;
}

export const WAYPOINTS: LocationWaypoint[] = [
  {
    id: 'loc-home',
    name: 'Home (Current Location)',
    type: 'home',
    timeSpent: 'Current • 10m ago',
    timestamp: '10:15 AM',
    xPercent: 32,
    yPercent: 32,
    description: 'Pet is safely resting at home (Signal: 98% UWB Precision).',
  },
  {
    id: 'loc-park',
    name: 'Central Bark Park',
    type: 'park',
    timeSpent: '45 mins stay',
    timestamp: '08:30 AM - 09:15 AM',
    xPercent: 54,
    yPercent: 48,
    description: 'Pet enjoyed morning exercise at the dog park.',
  },
  {
    id: 'loc-vet',
    name: 'Pet Care Clinic (Veterinary)',
    type: 'vet',
    timeSpent: '20 mins stay',
    timestamp: '09:30 AM - 09:50 AM',
    xPercent: 74,
    yPercent: 62,
    description: 'Routine checkup visit at the vet clinic.',
  },
];

interface PetFinderMapProps {
  activeLocationId?: string;
}

export const PetFinderMap = ({
  activeLocationId = 'loc-home',
}: PetFinderMapProps) => {
  // Slow looping zoom animation for Apple TV hero map background
  const zoomAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Looping slow zoom in & out animation
    const loopZoom = Animated.loop(
      Animated.sequence([
        Animated.timing(zoomAnim, {
          toValue: 1.08,
          duration: 10000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(zoomAnim, {
          toValue: 1,
          duration: 10000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    // Continuous pulse ring for current location
    const loopPulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    loopZoom.start();
    loopPulse.start();

    return () => {
      loopZoom.stop();
      loopPulse.stop();
    };
  }, [zoomAnim, pulseAnim]);

  const activeWaypoint =
    WAYPOINTS.find((w) => w.id === activeLocationId) || WAYPOINTS[0];

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 0],
  });

  return (
    <View style={styles.container} testID="pet-finder-map">
      {/* Animated Zooming Map Layer */}
      <Animated.View
        style={[
          styles.mapWrapper,
          {
            transform: [{scale: zoomAnim}],
          },
        ]}>
        <Image
          source={require('../assets/map_background.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />

        {/* Path lines connecting points (Demo: Home -> Park -> Vet -> Home loop) */}
        <View style={styles.overlayPathContainer} pointerEvents="none">
          {/* Path Line 1: Home to Park */}
          <View style={[styles.pathLine, styles.pathHomeToPark]} />
          {/* Path Line 2: Park to Vet */}
          <View style={[styles.pathLine, styles.pathParkToVet]} />
          {/* Path Line 3: Vet back to Home (Loop) */}
          <View style={[styles.pathLineDashed, styles.pathVetToHome]} />
        </View>

        {/* Waypoint Location Dots */}
        {WAYPOINTS.map((wp) => {
          const isActive = wp.id === activeLocationId;
          return (
            <View
              key={wp.id}
              style={[
                styles.markerPosition,
                {
                  left: `${wp.xPercent}%`,
                  top: `${wp.yPercent}%`,
                },
              ]}>
              {/* Pulsing ring for current/active location */}
              {isActive && (
                <Animated.View
                  style={[
                    styles.pulseRing,
                    {
                      transform: [{scale: pulseScale}],
                      opacity: pulseOpacity,
                    },
                  ]}
                />
              )}

              {/* Marker Dot */}
              <View
                style={[
                  styles.markerDot,
                  isActive ? styles.markerDotActive : styles.markerDotInactive,
                ]}>
                <Text style={styles.markerBadgeText}>
                  {wp.type === 'home' ? '🏠' : wp.type === 'park' ? '🌳' : '🩺'}
                </Text>
              </View>

              {/* Location Tag Card */}
              <View
                style={[
                  styles.locationCard,
                  isActive && styles.locationCardActive,
                ]}>
                <Text style={styles.locationCardTitle}>{wp.name}</Text>
                <Text style={styles.locationCardSubtitle}>{wp.timeSpent}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>

      {/* Airport-style Audio / Status Narration Banner Header */}
      <View style={styles.narrationHeader}>
        <Text style={styles.narrationIcon}>🎙️ AIRPORT NARRATION</Text>
        <Text style={styles.narrationText}>
          "{activeWaypoint.name} — {activeWaypoint.timestamp}.{' '}
          {activeWaypoint.description}"
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#050D1A',
    overflow: 'hidden',
  },
  mapWrapper: {
    width: '100%',
    height: '100%',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  overlayPathContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  pathLine: {
    position: 'absolute',
    height: 6,
    backgroundColor: '#00E5FF',
    shadowColor: '#00E5FF',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    borderRadius: 3,
  },
  pathHomeToPark: {
    left: '32%',
    top: '32%',
    width: '24%',
    transform: [{rotate: '34deg'}],
  },
  pathParkToVet: {
    left: '54%',
    top: '48%',
    width: '22%',
    transform: [{rotate: '28deg'}],
  },
  pathVetToHome: {
    left: '32%',
    top: '32%',
    width: '45%',
    transform: [{rotate: '38deg'}],
  },
  pathLineDashed: {
    position: 'absolute',
    height: 4,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: 'rgba(0, 229, 255, 0.4)',
  },
  markerPosition: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -25,
    marginTop: -25,
  },
  pulseRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 229, 255, 0.4)',
    borderWidth: 2,
    borderColor: '#00E5FF',
  },
  markerDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  markerDotActive: {
    backgroundColor: '#FF6200',
    borderColor: '#FFFFFF',
  },
  markerDotInactive: {
    backgroundColor: '#1E293B',
    borderColor: '#00E5FF',
  },
  markerBadgeText: {
    fontSize: 20,
  },
  locationCard: {
    position: 'absolute',
    top: 52,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    minWidth: 180,
    alignItems: 'center',
  },
  locationCardActive: {
    backgroundColor: 'rgba(255, 98, 0, 0.9)',
    borderColor: '#FFFFFF',
    transform: [{scale: 1.08}],
  },
  locationCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationCardSubtitle: {
    color: '#E2E8F0',
    fontSize: 13,
    marginTop: 2,
  },
  narrationHeader: {
    position: 'absolute',
    top: 40,
    left: 60,
    right: 320,
    backgroundColor: 'rgba(10, 18, 30, 0.88)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 229, 255, 0.3)',
    paddingHorizontal: 28,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  narrationIcon: {
    color: '#00E5FF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 6,
  },
  narrationText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 30,
  },
});
