import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {playFocusSound} from '../utils/sound';

export interface TileProps {
  label: string;
  icon: ImageSourcePropType;
  isFocused: boolean;
  onFocus: () => void;
  onBlur?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  hasTVPreferredFocus?: boolean;
  timeSpentProgress?: string; // Optional time spent progress bar / status text for location tiles
}

export const Tile = ({
  label,
  icon,
  isFocused,
  onFocus,
  onBlur,
  testID,
  accessibilityLabel,
  hasTVPreferredFocus,
  timeSpentProgress,
}: TileProps) => {
  const handleFocus = () => {
    playFocusSound();
    onFocus();
  };

  return (
    <TouchableOpacity
      style={[styles.tile, isFocused ? styles.focused : styles.default]}
      onFocus={handleFocus}
      onBlur={onBlur}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      hasTVPreferredFocus={hasTVPreferredFocus}
      activeOpacity={1}>
      {/* Top Half: Icon */}
      <View style={styles.topHalf}>
        <Image
          source={icon}
          style={[styles.icon, isFocused && styles.iconFocused]}
          resizeMode="contain"
          accessible={false}
        />
      </View>

      {/* Bottom Half: Label + optional time spent indicator line */}
      <View style={styles.bottomHalf}>
        <Text style={[styles.label, isFocused && styles.labelFocused]}>
          {label}
        </Text>

        {timeSpentProgress && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
            <Text style={styles.progressText}>{timeSpentProgress}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 280,
    height: 280,
    borderRadius: 32,
    overflow: 'hidden',
    padding: 24,
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.6,
    shadowRadius: 18,
  },
  topHalf: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default: {
    backgroundColor: '#0074B8',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  focused: {
    backgroundColor: '#FF6200',
    borderColor: '#FFFFFF',
    transform: [{scale: 1.1}],
    shadowColor: '#FF6200',
    shadowOffset: {width: 0, height: 16},
    shadowOpacity: 0.8,
    shadowRadius: 28,
    opacity: 1,
  },
  icon: {
    width: 80,
    height: 80,
    tintColor: '#FFFFFF',
  },
  iconFocused: {
    tintColor: '#FFFFFF',
    transform: [{scale: 1.12}],
  },
  label: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 44,
    includeFontPadding: false,
  },
  labelFocused: {
    color: '#FFFFFF',
    fontWeight: '900',
  },
  progressContainer: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '65%',
    height: '100%',
    backgroundColor: '#00E5FF',
    borderRadius: 3,
  },
  progressText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
