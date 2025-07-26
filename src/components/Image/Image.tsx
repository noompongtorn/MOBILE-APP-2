import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View, ActivityIndicator, Text} from 'react-native';
import {SvgXml} from 'react-native-svg'; // Import SvgXml from react-native-svg

interface DynamicImageProps {
  uri: string; // URL of the image (could be PNG/JPG/SVG)
  width?: number;
  height?: number;
  fallbackComponent?: React.ReactNode; // Custom fallback (e.g., spinner or text)
}

const DynamicImage: React.FC<DynamicImageProps> = ({
  uri,
  width = 45,
  height = 45,
  fallbackComponent,
}) => {
  const [imageContent, setImageContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isSvg = uri.endsWith('.svg'); // Check if the file is an SVG based on the URL

  useEffect(() => {
    if (isSvg) {
      // Fetch the SVG content if it's an SVG URL
      const fetchSvg = async () => {
        try {
          const response = await fetch(uri);
          const svgText = await response.text();
          setImageContent(svgText);
        } catch (error) {
          console.error('Error fetching SVG:', error);
          setImageContent(null); // Optional: you can set a fallback SVG here
        } finally {
          setLoading(false);
        }
      };

      fetchSvg();
    } else {
      setLoading(false); // For non-SVG files, we don't need to fetch the content
    }
  }, [uri, isSvg]);

  if (loading) {
    return fallbackComponent || <ActivityIndicator size="small" color="#000" />;
  }

  if (isSvg && imageContent) {
    return (
      <View style={[styles.container, {width, height}]}>
        <SvgXml xml={imageContent} width={width} height={height} />
      </View>
    );
  } else if (!isSvg) {
    return (
      <View style={[styles.container, {width, height}]}>
        {uri && <Image source={{uri}} style={{width, height}} />}
      </View>
    );
  }

  return <Text>Failed to load image</Text>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DynamicImage;
