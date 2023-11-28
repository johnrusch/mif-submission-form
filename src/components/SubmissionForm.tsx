import { useState } from "preact/hooks";

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: SubmitEvent) {
    e.preventDefault();
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
    <form onSubmit={submit} class="space-y-4 bg-white p-6 rounded shadow-md">
      <div class="flex flex-col">
        <label for="title" class="text-green-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div class="flex flex-col">
        <label for="artist" class="text-green-700">
          Artist
        </label>
        <input
          type="text"
          id="artist"
          name="artist"
          required
          class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div class="flex flex-col">
        <label for="description" class="text-green-700">
          Short Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          class="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
      </div>
      <div class="flex flex-col">
        <label for="file" class="text-green-700">
          Song File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          required
          class="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
        Upload Song
      </button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
