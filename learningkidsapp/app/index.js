import { Pressable, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <><Link href="/gamehub/gamehub_mainscreen" asChild>
      <Pressable>
        <Text>Game Hub</Text>
      </Pressable>
    </Link><Link href="/gamehub/landing_screen" asChild>
        <Pressable>
          <Text>Landing Screen</Text>
        </Pressable>
      </Link></>

  );
}