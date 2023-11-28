import { useState } from "preact/hooks";
import { navigate } from "astro/transitions/router";
import Spinner from './Spinner.tsx'

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("data response: ", data);
    if (data.status === 200) {
      setLoading(false);
      return navigate("/submission/confirmation", { state: data.song });
    }
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
          class="form-input p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
          class="form-input p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div class="flex flex-col">
        <label for="description" class="text-green-700">
          Short Description
        </label>
        <textarea
          id="description"
          name="description"
          class="form-textarea p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        ></textarea>
      </div>
      <div class="flex flex-col">
        <label for="upload" class="text-green-700">
          Song File
        </label>
        <input
          type="file"
          id="upload"
          name="upload"
          required
          class="p-2 mt-1 block w-full rounded-md shadow-sm"
        />
      </div>
      <div class="flex flex-col">
        <label for="key" class="text-green-700">
          Very Secret Key
        </label>
        <input
          type="text"
          id="key"
          name="key"
          required
          class="p-2 mt-1 block w-full rounded-md shadow-sm"
        />
      </div>
      <button class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-green-700 hover:bg-custom-green">
        {loading ? (
          <div>
            <Spinner /> <span>"Uploading..."</span>
          </div>
        ) : (
          "Upload Song"
        )}
      </button>

      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}
