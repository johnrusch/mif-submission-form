import { useState } from "preact/hooks";


export default function SubmissionForm() {
  const [responseMessage, setResponseMessage] = useState("");
  console.log("lskdjflksjdflkj")
  async function submit(e: Event) {
    e.preventDefault();
    console.log("hello?????")
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form id="upload-form" onSubmit={submit}>
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="artist" placeholder="Artist"  />
      <textarea
        name="description"
        placeholder="Short Description"
        
      ></textarea>
      <input type="file" name="file"  />
      <button type="submit">Upload Song</button>
    </form>
  );
}
