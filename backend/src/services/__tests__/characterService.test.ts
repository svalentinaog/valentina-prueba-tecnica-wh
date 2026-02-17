import { CharacterService } from "../characterService";
import { Character } from "../../models/characterModel";

jest.mock("../../models/characterModel");

describe("Character Service", () => {
  let service: CharacterService;
  let mockCharacter: jest.Mocked<Character>;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CharacterService();
    mockCharacter = (Character as any).mock.instances[0];
  });

  // createCharacter
  it("Deberia arrojar un error si el nombre ya existe", async () => {
    (Character as any).findAll = jest
      .fn()
      .mockResolvedValue([{ name: "Juan", img: "http://example.com/a.png" }]);

    const data = {
      name: "Juan",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = service.createCharacter(data);

    await expect(result).rejects.toThrow("Name already exists");
  });

  it("Deberia arrojar un error si la imagen ya existe", async () => {
    (Character as any).findAll = jest
      .fn()
      .mockResolvedValue([{ name: "Pedro", img: "http://example.com/b.png" }]);

    const data = {
      name: "Pablo",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = service.createCharacter(data);

    await expect(result).rejects.toThrow("Image already exists");
  });

  it("Deberia retornar un objeto creado exitosamente", async () => {
    (Character as any).findAll = jest
      .fn()
      .mockResolvedValue([{ name: "Pedro", img: "http://example.com/r.png" }]);
    (Character as any).create = jest
      .fn()
      .mockResolvedValue({ name: "Pablo", img: "http://example.com/b.png" });

    const data = {
      name: "Pablo",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = service.createCharacter(data);

    await expect(result).resolves.toEqual({
      name: "Pablo",
      img: "http://example.com/b.png",
    });
  });

  // updateCharacter
  it("Deberia arrojar un error si intentan actualizar un personaje directo de disney", async () => {
    const id = "disney-123";
    const data = {
      name: "Juan",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = service.updateCharacter(id, data);

    await expect(result).rejects.toThrow("You cannot edit Disney characters");
  });

  it("Deberia arrojar un error si intentan actualizar un personaje y no existe ", async () => {
    (Character as any).findByPk = jest.fn().mockResolvedValue(null);
    const id = "123";
    const data = {
      name: "Juan",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = service.updateCharacter(id, data);

    await expect(result).rejects.toThrow("Character not found");
  });

  it("Deberia arrojar un error si intentan actualizar un personaje y name ya existe ", async () => {
    (Character as any).findByPk = jest.fn().mockResolvedValue({ name: "Juan" });
    (Character as any).findAll = jest
      .fn()
      .mockResolvedValue([{ name: "Juan" }]);
    const id = "123";
    const data = {
      name: "Juan",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = service.updateCharacter(id, data);

    await expect(result).rejects.toThrow("Name already exists");
  });

  it("Deberia arrojar un error si intentan actualizar un personaje y imag ya existe ", async () => {
    (Character as any).findByPk = jest.fn().mockResolvedValue({ name: "Juan" });
    (Character as any).findAll = jest
      .fn()
      .mockResolvedValue([{ name: "Pablo", img: "http://example.com/b.png" }]);
    const id = "123";
    const data = {
      name: "Juan",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = service.updateCharacter(id, data);

    await expect(result).rejects.toThrow("Image already exists");
  });

  it("Deberia actualizar un personaje exitosamente", async () => {
    (Character as any).findByPk = jest.fn().mockResolvedValue({
      name: "Juan",
      update: jest
        .fn()
        .mockResolvedValue({ name: "Juan", img: "http://example.com/b.png" }),
    });
    (Character as any).findAll = jest
      .fn()
      .mockResolvedValue([{ name: "Pablo", img: "http://example.com/a.png" }]);

    const id = "123";
    const data = {
      name: "Juan",
      img: "http://example.com/b.png",
      description: "Descripcion valida",
      date: new Date().toISOString(),
    };

    const result = await service.updateCharacter(id, data);

    expect(result).toEqual({
      name: "Juan",
      img: "http://example.com/b.png",
    });
  });

  it("Deberia fallar al eliminar un personaje de disney", async () => {
    const id = "disney-123";

    const result = service.deleteCharacter(id);

    expect(result).rejects.toThrow(
      "You do not have permission to delete Disney characters"
    );
  });

  it("Deberia eliminar un personaje exitosamente", async () => {
    (Character as any).destroy = jest.fn().mockResolvedValue(true);

    const id = "123";

    const result = service.deleteCharacter(id);

    expect(result).resolves.toEqual(true);
  });

  it("Deberia arrojar error si intentan eliminar un personaje y no existe", async () => {
    (Character as any).destroy = jest.fn().mockResolvedValue(0);
    const id = "123";

    const result = service.deleteCharacter(id);

    expect(result).rejects.toThrow("Character does not exist in the database");
  });
});
