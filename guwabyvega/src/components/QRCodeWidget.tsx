import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const QRCodeWidget = () => {
  return (
    <View style={styles.container} testID="qr-code-widget">
      <View style={styles.qrFrame}>
        {/* Stylized QR Code Grid Matrix */}
        <View style={styles.qrGrid}>
          <View style={[styles.qrCorner, styles.qrTopLeft]} />
          <View style={[styles.qrCorner, styles.qrTopRight]} />
          <View style={[styles.qrCorner, styles.qrBottomLeft]} />
          <View style={styles.qrCenterDot} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Continue on the Phone</Text>
        <Text style={styles.subtitle}>Scan to open GUWABY Mobile</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 14,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    zIndex: 100,
  },
  qrFrame: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrGrid: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  qrCorner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderWidth: 4,
    borderColor: '#0F172A',
    borderRadius: 3,
  },
  qrTopLeft: {
    top: 0,
    left: 0,
  },
  qrTopRight: {
    top: 0,
    right: 0,
  },
  qrBottomLeft: {
    bottom: 0,
    left: 0,
  },
  qrCenterDot: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    backgroundColor: '#FF6200',
    borderRadius: 3,
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 2,
  },
});
