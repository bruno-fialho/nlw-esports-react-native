import { View, Image, FlatList } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GamerCard';
import { Heading } from '../../components/Heading';

import { GAMES } from '../../utils/games';
import { styles } from './styles';

interface Props {
  children: React.ReactNode
}

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo}
      />

      <Heading 
        title='Encontre seu duo!'
        subtitle='Selecione o game que deseja jogar...'
      />

      <FlatList
        data={GAMES}
        keyExtractor={item => item.id} //string
        renderItem={({ item }) => (
          <GameCard
            key={item.id}
            data={item}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
