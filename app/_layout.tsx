import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Star Wars movies explorer',
          headerStyle: {
            backgroundColor: '#ffe81f',
          },
          headerTintColor: '#2e557c',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="film/[id]"
        options={({ route }) => ({
          headerTitle: (route.params as { filmTitle: string }).filmTitle || '',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#2a5a97',
          },
          headerTintColor: '#FF5349',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        })}
      />
    </Stack>
  );
}
