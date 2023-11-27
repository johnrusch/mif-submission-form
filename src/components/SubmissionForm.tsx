import { useState } from "preact/hooks";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form id="upload-form" method="post" onSubmit={submit}>
      <input type="text" name="title" placeholder="Title" required />
      <input type="text" name="artist" placeholder="Artist" required />
      <textarea
        name="description"
        placeholder="Short Description"
        required
      ></textarea>
      <input type="file" name="file" required />
      <button type="submit">Upload Song</button>
    </form>
  );
}
