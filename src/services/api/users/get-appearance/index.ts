import HttpClient from "../../../../helpers/axios";
import { CharacterInterfaceResponse } from "./types";
import { CharacterInterface } from "../../../../types/character";
import { DefaultAppearance } from "../../../../context/CharacterContext";

const baseUrl = process.env.REACT_APP_BASE_URL;
const URL = baseUrl + "/appearances";

export async function getAppearance(): Promise<CharacterInterface> {
  const response = await HttpClient.get<CharacterInterfaceResponse>(URL);
  if (response.status !== 200) {
    return {} as CharacterInterface;
  }
  let result = DefaultAppearance as CharacterInterface;
  for (const item of response.data.data.appearances) {
    result[item.key] = item.value;
  }

  console.log();
  return result;
}
