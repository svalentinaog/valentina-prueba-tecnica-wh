import axios from "axios";
import {
  DisneyApiResponse,
  DisneySingleResponse,
  DisneyCharacter,
} from "../types/disneyTypes";
import { ENVS } from "../config/envs";

class DisneyService {
  private readonly API_URL = ENVS.DISNEY_API_URL;

  async getAllCharacters() {
    try {
      const response = await axios.get<DisneyApiResponse>(this.API_URL);
      const rawData = response.data.data;

      // Data mapping
      return rawData.map((char: DisneyCharacter) => ({
        id: `disney-${char._id}`,
        name: char.name,
        date: new Date().toISOString(),
        description:
          char.films.length > 0
            ? `Movies: ${char.films.join(", ")}`
            : "No movies registered",
        img: char.imageUrl,
      }));
    } catch (error) {
      console.error("Error in DisneyService.getAllCharacters:", error);
      return [];
    }
  }

  async getCharacterById(disneyId: string) {
    try {
      const response = await axios.get<DisneySingleResponse>(
        `${this.API_URL}/${disneyId}`
      );
      const data = response.data.data;

      return {
        id: `disney-${data._id}`,
        name: data.name,
        date: new Date().toISOString(),
        description:
          data.films.length > 0
            ? `Movies: ${data.films.join(", ")}`
            : "No movies registered",
        img: data.imageUrl,
      };
    } catch (error) {
      console.error("Error in DisneyService.getCharacterById:", error);
      return null;
    }
  }
}

export default new DisneyService();
