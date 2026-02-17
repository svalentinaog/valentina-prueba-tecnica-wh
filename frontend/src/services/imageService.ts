import api from "@/services/api";

export const imageService = {
  async upload(file: File): Promise<{ url: string }> {
    const form = new FormData();
    form.append("file", file);
    const { data } = await api.post<{ url: string }>("/uploads", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};
