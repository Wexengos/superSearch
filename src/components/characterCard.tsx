import { View, StyleSheet, Text, Image } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
  character: any;
};

function getIcon(value: string): string {
  switch (value) {
    case "good":
      return "emoticon-happy";
    case "bad":
      return "emoticon-devil";
    case "neutral":
      return "emoticon-neutral";
    default:
      return "emoticon-neutral";
  }
}

function getIconStyle(value: string): Object {
  switch (value) {
    case "good":
      return styles.heroEmoji;
    case "bad":
      return styles.villainEmoji;
    case "neutral":
      return styles.neutralEmoji;
    default:
      return styles.neutralEmoji;
  }
}

const CharacterCard: React.FC<Props> = ({ character }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageNameContainer}>
        <View>
          <Image style={styles.image} source={{ uri: character.image.url }} />
          <View style={styles.iconContainer}>
            <Icon
              name={getIcon(character.biography.alignment)}
              size={32}
              style={getIconStyle(character.biography.alignment)}
            />
          </View>
        </View>

        <Text style={styles.name}>{character.name}</Text>
      </View>

      {/* ÁREA DE STATUS */}
      <View style={styles.powerstatsContainer}>
        <View style={styles.powerstatsText}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon name={"sword"} size={16} style={{ color: "#ad0600" }} />
            <Text>&nbsp;COMBATE</Text>
          </View>
          <Text>{character.powerstats.combat}</Text>
        </View>
        <View style={styles.powerstatsText}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon name={"shield"} size={16} style={{ color: "#2b4399" }} />
            <Text>&nbsp;DURABILIDADE</Text>
          </View>
          <Text>{character.powerstats.durability}</Text>
        </View>
        <View style={styles.powerstatsText}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon name={"school"} size={16} style={{ color: "#ebc623" }} />
            <Text>&nbsp;INTELIGÊNCIA</Text>
          </View>
          <Text>{character.powerstats.intelligence}</Text>
        </View>
        <View style={styles.powerstatsText}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              name={"lightning-bolt"}
              size={16}
              style={{ color: "#4a0582" }}
            />
            <Text>&nbsp;PODER</Text>
          </View>
          <Text>{character.powerstats.power}</Text>
        </View>
        <View style={styles.powerstatsText}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon name={"speedometer"} size={16} style={{ color: "#07780f" }} />
            <Text>&nbsp;VELOCIDADE</Text>
          </View>
          <Text>{character.powerstats.speed}</Text>
        </View>
        <View style={styles.powerstatsText}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon name={"arm-flex"} size={16} style={{ color: "#eb8a0c" }} />
            <Text>&nbsp;FORÇA</Text>
          </View>
          <Text>{character.powerstats.strength}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    margin: "1rem",
    width: "20rem",
    height: "10rem",
    borderRadius: 5,
    padding: "1rem",
  },
  imageNameContainer: {
    width: 90,
    display: "flex",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: -10,
    right: -10,
    backgroundColor: "white",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  villainEmoji: {
    color: "darkred",
  },
  heroEmoji: {
    color: "darkblue",
  },
  neutralEmoji: {
    color: "gold",
  },
  image: {
    width: 90,
    height: 90,
  },
  name: {
    fontSize: 18,
    textAlign: "center",
    marginTop: "0.5rem",
  },
  powerstatsContainer: {
    height: "100%",
    width: "70%",
    justifyContent: "space-between",
    paddingLeft: "2rem",
  },
  powerstatsText: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CharacterCard;
