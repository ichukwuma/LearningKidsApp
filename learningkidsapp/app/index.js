import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
      <Link href="/game_hub_main_screen">Game Hub</Link>
      <Link href="/home/home">Home</Link>
    </View>
  );
}
