import { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";

import { Appbar, TextInput, Card, List, Chip } from "react-native-paper";

import getLabel from "./src/utils/getLabel";

import CharacterCard from "./src/components/characterCard";

import axios from "axios";

const windowWidth = Dimensions.get("window").width; // pega as dimensões do dispositivo atual para usar nos estilos.

interface LooseObject {
  [key: string]: any;
}

const App: React.FC<any> = () => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(""); // valor do campo de pesquisa;
  const [result, setResult] = useState<LooseObject[]>([]); // resultado da pesquisa (sem filtros);
  const [filteredResult, setFilteredResult] = useState<LooseObject[]>([]); // resultado filtrado da pesquisa;
  const [menuItems, setMenuItems] = useState<LooseObject>(); // itens a serem exibidos no menu de filtros;

  const onChangeSearch = (query: string) => setSearchQuery(query); // altera o valor do campo de pesquisa;

  // função que filtra os resultados, com base na categoria selecionada:
  const filterItem = (current: string, category: string) => {
    const newResult = result.filter((newItem) => {
      return Object.values(newItem[category]).find(
        (element) => element === current
      );
    });

    setFilteredResult(newResult);
  };

  // função que realiza a requisição à API com base no que foi digitado no campo de busca.
  async function searchCharacter() {
    if (searchQuery !== "") {
      console.log("hop");

      await axios
        .get(
          `https://superheroapi.com/api.php/2572562639543647/search/${searchQuery}`
        )
        .then((res) => {
          console.log("resultado: ", res);
          if (res.data.response !== "error") {
            setResult(res.data.results);
            setFilteredResult(res.data.results);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    // após a pesquisa, mapeia entre as características do resultado.
    setMenuItems({
      genders: [...new Set(result.map((Val) => Val.appearance.gender))],
      alignment: [...new Set(result.map((Val) => Val.biography.alignment))],
    }); // possíveis gêneros entre os resultados da pesquisa.
  }, [result]);

  return (
    <View style={styles.container}>
      <Appbar
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
        }}
      >
        <Appbar.Content title="SuperSearch" />
      </Appbar>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={"Buscar herói ou vilão."}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          right={<TextInput.Icon name="magnify" onPress={searchCharacter} />}
        />
      </View>
      {result?.length > 0 && (
        <List.Accordion
          title="Filtrar por"
          left={(props) => <List.Icon {...props} icon="filter" />}
          style={styles.filterAccordion}
          descriptionStyle={{ backgroundColor: "blue" }}
        >
          <View
            style={{
              paddingTop: "0.5rem",
              paddingBottom: "1rem",
              paddingLeft: "1rem",
              backgroundColor: "#EEEEEE",
            }}
          >
            <Text style={styles.chipLabel}> Gênero </Text>
            <View style={{ display: "flex" }}>
              {menuItems?.genders.length > 0 && (
                <FlatList
                  data={menuItems?.genders}
                  keyExtractor={(item) => item.indexOf()}
                  numColumns={3}
                  renderItem={({ item }) => {
                    return (
                      <Chip
                        style={styles.menuChip}
                        onPress={() => filterItem(item, "appearance")}
                      >
                        {getLabel(item)}
                      </Chip>
                    );
                  }}
                />
              )}
            </View>
            <Text style={styles.chipLabel}> Alinhamento </Text>
            <View
              style={{
                maxWidth: "100%",
              }}
            >
              {menuItems?.alignment.length > 0 && (
                <FlatList
                  data={menuItems?.alignment}
                  keyExtractor={(item) => item.indexOf()}
                  numColumns={3}
                  renderItem={({ item }) => {
                    return (
                      <Chip
                        style={styles.menuChip}
                        onPress={() => filterItem(item, "biography")}
                      >
                        {getLabel(item)}
                      </Chip>
                    );
                  }}
                />
              )}
            </View>
            <Chip
              style={styles.clearChip}
              onPress={() => setFilteredResult(result)}
            >
              Limpar Filtros
            </Chip>
          </View>
        </List.Accordion>
      )}
      <ScrollView>
        {filteredResult?.map((item: any, index: number) => {
          return (
            <View key={index}>
              <CharacterCard character={item} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: windowWidth,
    alignItems: "center",
    paddingTop: "4rem",
  },
  searchContainer: {
    marginTop: "-0.2rem",
    width: "100%",
  },
  searchBar: {
    width: "100%",
  },
  searchButton: {
    width: "0.2rem",
    justifyContent: "center",
  },
  filterAccordion: {
    backgroundColor: "white",
    width: "100vw",
    padding: 0,
  },
  chipLabel: {
    fontSize: 16,
  },
  menuChip: {
    backgroundColor: "lightgrey",
    width: 100,
    margin: "0.25rem",
  },
  clearChip: {
    backgroundColor: "darkgrey",
    position: "absolute",
    right: 5,
    top: 5,
    height: 20,
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
