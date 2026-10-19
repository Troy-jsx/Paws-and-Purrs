import { useEffect, useState } from "react";
import { api } from "../api";

const emptyForm = { name: "", gender: "", age: "", description: "", image: "" };

export default function Adoption() {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/animals")
      .then(setAnimals)
      .catch((err) => setError(err.message));
  }, []);

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setImageFile(null);
    setEditingId(null);
  }

  function handleImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    updateField("image", URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("gender", form.gender);
    data.append("age", form.age);
    data.append("description", form.description);
    if (imageFile) data.append("image", imageFile);

    try {
      if (editingId) {
        const updated = await api(`/animals/${editingId}`, {
          method: "PUT",
          body: data,
        });
        setAnimals((list) =>
          list.map((a) => (a.id === editingId ? updated : a)),
        );
      } else {
        const created = await api("/animals", { method: "POST", body: data });
        setAnimals((list) => [created, ...list]);
      }
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(animal) {
    setForm(animal);
    setImageFile(null);
    setEditingId(animal.id);
  }

  async function handleRemove(id) {
    try {
      await api(`/animals/${id}`, { method: "DELETE" });
      setAnimals((list) => list.filter((a) => a.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex min-w-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-8 md:gap-12 md:px-8 md:py-10 xl:overflow-hidden">
      <h1 className="select-none font-display text-[48px] text-magenta-500 [text-box:trim-both_cap_alphabetic] md:text-[64px] xl:text-[80px]">
        Adoption
      </h1>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-danger/20 px-4 py-3 font-josefin text-[18px] font-semibold text-danger"
        >
          {error}
        </p>
      )}

      <div className="flex flex-col gap-6 xl:min-h-0 xl:flex-1 xl:flex-row">
        <AnimalForm
          form={form}
          isEditing={editingId !== null}
          saving={saving}
          onChange={updateField}
          onImage={handleImage}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <ul className="flex min-w-0 flex-1 flex-col gap-4 xl:min-h-0 xl:overflow-y-auto xl:pr-2">
          {animals.map((animal) => (
            <li key={animal.id}>
              <AnimalListing
                {...animal}
                onEdit={() => handleEdit(animal)}
                onRemove={() => handleRemove(animal.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function AnimalForm({
  form,
  isEditing,
  saving,
  onChange,
  onImage,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-4 xl:min-h-0 xl:w-[40%] xl:shrink-0 2xl:w-[36%]"
    >
      <div className="flex flex-col gap-4 rounded-lg bg-magenta-500 p-4 xl:min-h-0 xl:flex-1">
        <label className="relative flex h-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#cbcbcb] sm:h-[320px] xl:h-auto xl:min-h-[140px] xl:flex-1">
          {form.image && (
            <img
              src={form.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          )}
          <span className="relative flex h-14 w-[180px] items-center justify-center rounded-lg bg-[#727272] font-josefin text-[20px] font-semibold text-white transition-colors hover:bg-[#5a5a5a] md:h-16 md:text-[22px]">
            {form.image ? "Change Image" : "Upload Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onImage}
            className="sr-only"
          />
        </label>

        <input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Name"
          required
          title=""
          className="w-full min-w-0 bg-transparent font-display text-[32px] leading-[1.2] text-magenta-100 outline-none placeholder:text-magenta-100/80 sm:text-[40px] 2xl:text-[56px]"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={form.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            required
            title=""
            className="h-[42px] min-w-[120px] flex-1 cursor-pointer appearance-none rounded-lg bg-pink-200 px-4 text-center font-josefin text-[15px] font-medium text-magenta-500 outline-none"
          >
            <option value="" disabled>
              Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label className="flex h-[42px] min-w-[160px] flex-1 items-center justify-center gap-1 rounded-lg bg-pink-200 px-4 font-josefin text-[15px] font-medium whitespace-nowrap text-magenta-500">
            Estimated Age:
            <input
              type="number"
              min="0"
              value={form.age}
              onChange={(e) => onChange("age", e.target.value)}
              placeholder="0"
              required
              title=""
              className="w-10 bg-transparent text-magenta-500 outline-none placeholder:text-magenta-500"
            />
          </label>
        </div>

        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Add description"
          rows={4}
          required
          title=""
          className="w-full resize-none bg-transparent font-josefin text-[18px] font-semibold leading-[1.2] text-magenta-100 outline-none placeholder:text-magenta-100/80 md:text-[20px]"
        />
      </div>

      <div className="flex gap-4">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="h-14 flex-1 rounded-lg bg-pink-base font-josefin text-[20px] font-semibold text-magenta-500 shadow-[0_4px_4px_0_#692947] transition-colors hover:bg-pink-200 md:h-16 md:text-[22px]"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={saving}
          className="h-14 flex-1 rounded-lg bg-magenta-400 font-josefin text-[20px] font-semibold text-magenta-100 drop-shadow-[0_4px_2px_#3b023d] transition-colors hover:bg-[#c92fcf] disabled:opacity-60 md:h-16 md:text-[22px]"
        >
          {saving ? "Saving..." : isEditing ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}

function AnimalListing({
  name,
  gender,
  age,
  description,
  image,
  onEdit,
  onRemove,
}) {
  return (
    <article className="@container rounded-lg bg-magenta-500 p-4">
      <div className="flex flex-col gap-4 @lg:flex-row @lg:items-start @lg:gap-6">
        <div className="h-[200px] w-full shrink-0 overflow-hidden rounded-lg bg-[#4d4d4d] @sm:h-[231px] @lg:w-[193px]">
          {image && (
            <img src={image} alt={name} className="size-full object-cover" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <h2 className="font-display text-[28px] leading-[1.2] text-magenta-100 @md:text-[32px] @md:leading-[38px]">
            {name}
          </h2>

          <div className="flex flex-wrap gap-2">
            <Badge>{gender}</Badge>
            <Badge>Estimated Age: {age}</Badge>
          </div>

          <p className="line-clamp-3 font-josefin text-[18px] font-semibold leading-[1.2] text-magenta-100 [text-box:trim-start_cap_alphabetic] @md:text-[20px]">
            {description}
          </p>

          <div className="mt-1 flex gap-3 @md:gap-4">
            <button
              type="button"
              onClick={onEdit}
              className="h-12 flex-1 rounded-lg bg-magenta-400 font-josefin text-[18px] font-semibold text-magenta-100 shadow-[0_4px_4px_0_#f] transition-colors hover:bg-magenta-300 @md:h-14 @md:text-[22px]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="h-12 flex-1 rounded-lg stroke-4 outline-gray-300 outline-1 font-josefin text-[18px] font-semibold text-gray-300 shadow-[0_4px_4px_0_#f] transition-colors hover:bg-danger @md:h-14 @md:text-[22px]"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Badge({ children }) {
  return (
    <span className="flex h-[30px] min-w-[100px] flex-1 items-center justify-center rounded-lg bg-pink-200 px-4 font-josefin text-[15px] font-medium whitespace-nowrap text-magenta-500">
      {children}
    </span>
  );
}
