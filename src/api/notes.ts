import axios from "axios";

export const upsertNote = async (content: string) => {
  const token = localStorage.getItem("SECRET_TOKEN");

  const options = {
    method: "POST",
    url: "https://mygo.ninthing.one:18690/api/v1/note/upsert",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      content,
      type: 0,
      attachments: [],
      isArchived: null,
      isTop: null,
      isShare: null,
      isRecycle: null,
      references: [null],
    },
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
};
