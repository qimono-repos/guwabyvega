import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TVFocusGuideView} from '@amazon-devices/react-native-kepler';
import {Tile} from './components/Tile';
import {tiles} from './data/tiles';
import {PetFinderMap} from './components/PetFinderMap';
import {QRCodeWidget} from './components/QRCodeWidget';

export const App = () => {
  const [focusedTileId, setFocusedTileId] = useState<string>('home');

  const focusedTile = tiles.find((t) => t.id === focusedTileId) || tiles[0];
  const activeLocationId = focusedTile.locationId || 'loc-home';

  return (
    <View style={styles.screenContainer}>
      {/* Background Animated Pet Finder Map */}
      <PetFinderMap activeLocationId={activeLocationId} />

      {/* Floating QR Code Widget: Continue on Phone */}
      <QRCodeWidget />

      {/* Main Content Shell */}
      <View style={styles.contentOverlay}>
        {/* Header Hero Area */}
        <View style={styles.headerArea}>
          {focusedTileId === 'home' ? (
            <>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Guwaby Pet Finder</Text>
                <Text style={styles.headerSubtitle} />
              </View>
              <Image
                source={require('./assets/dog_avatar.png')}
                style={styles.petAvatar}
                resizeMode="cover"
                testID="pet-avatar"
              />
            </>
          ) : (
            <>
              <View style={styles.headerTextContainer}>
                <Text style={styles.focusedTitle}>
                  {focusedTile.label.replace('\n', ' ')}
                </Text>
              </View>
              {focusedTile.description && (
                <Text style={styles.focusedDescription}>
                  {focusedTile.description}
                </Text>
              )}
            </>
          )}
        </View>

        {/* Horizontal Navigation Tile Row */}
        <TVFocusGuideView style={styles.tileRowContent}>
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              label={tile.label}
              icon={tile.icon}
              isFocused={focusedTileId === tile.id}
              onFocus={() => setFocusedTileId(tile.id)}
              onBlur={() => {}}
              testID={`tile-${tile.id}`}
              accessibilityLabel={tile.accessibilityLabel}
              hasTVPreferredFocus={tile.id === 'home'}
              timeSpentProgress={tile.timeSpentProgress}
            />
          ))}
        </TVFocusGuideView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#050D1A',
  },
  contentOverlay: {
    flex: 1,
    paddingHorizontal: 80,
    paddingTop: 120,
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
  headerArea: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 60,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 90,
    lineHeight: 100,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 10,
  },
  headerSubtitle: {
    color: '#00E5FF',
    fontSize: 34,
    fontWeight: '600',
    marginTop: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
  },
  petAvatar: {
    width: 210,
    height: 210,
    borderRadius: 42,
    marginLeft: 60,
    borderWidth: 3,
    borderColor: 'rgba(0, 229, 255, 0.8)',
    shadowColor: '#00E5FF',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  focusedTitle: {
    color: '#FFFFFF',
    fontSize: 80,
    lineHeight: 90,
    fontWeight: '800',
    width: 600,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 12,
  },
  focusedDescription: {
    color: '#F1F5F9',
    fontSize: 40,
    lineHeight: 54,
    flex: 1,
    marginLeft: 40,
    paddingTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 10,
  },
  tileRowContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
});
