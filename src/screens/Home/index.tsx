import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GamerCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    fetch('http://192.168.0.108:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
      })
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading 
          title='Encontre seu duo!'
          subtitle='Selecione o game que deseja jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id} //string
          renderItem={({ item }) => (
            <GameCard
              key={item.id}
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
