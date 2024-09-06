import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
     <Link href="/corgi_escape_tutorial">Corgi Escape Tutorial</Link>
     <Link href="/treat_falls_tutorial">Treat Falls Tutorial</Link>
     <Link href="/gamehub/corgi_escape">Corgi Escape</Link>
     <Link href="/gamehub/treat_falls">Treat Falls</Link>
    </View>
  );
}
