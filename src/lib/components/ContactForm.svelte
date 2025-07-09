<script>
	import { goto } from "$app/navigation";
	import api from "$lib/api";
	import { redirect } from "@sveltejs/kit";
	import { toast } from "@zerodevx/svelte-toast";
	import { onMount } from "svelte";

  // export let onSubmit = () => {};

  let name = "";
  let email = "";
  let phone = "";
  let message = "";
  let submitted = false;

  onMount(async () => {
    try{
      const res = await api.get("/profile");
      name = res.data.user.name || "";
      email = res.data.user.email || "";
      console.log("Profile fetched successfully:", res.data.user);
    }catch(err) {
      console.error("Error fetching profile:", err);
    }
  })

  async function handleSubmit(event) {
    event.preventDefault();
    submitted = true;

    try {
      const res = await api.post("/contact", {
        "name" : name,
        "email" : email,
        "phone" : phone,
        "message" : message
      });
      console.log("Contact form submitted successfully:", res.data);
      toast.push(res.data.message);
      goto("/dashboard");
    } catch (err) {
      console.error("Error submitting contact form:", err);
    } finally {
      submitted = false;
    }
  }
  
</script>

<form class="bg-white shadow p-4 rounded animate__animated animate__zoomIn" on:submit={handleSubmit}>
  <div class="mb-3">
    <label class="form-label fw-semibold">Full Name</label>
    <input type="text" class="form-control" placeholder="Your Name" bind:value={name} required />
  </div>

  <div class="mb-3">
    <label class="form-label fw-semibold">Email</label>
    <input type="email" class="form-control" placeholder="you@example.com" bind:value={email} required />
  </div>

  <div class="mb-3">
    <label class="form-label fw-semibold">Phone Number</label>
    <input type="tel" class="form-control" placeholder="1234567890" bind:value={phone} required />
  </div>

  <div class="mb-3">
    <label class="form-label fw-semibold">Message / Issue</label>
    <textarea class="form-control" rows="4" placeholder="Describe your issue or suggestion" bind:value={message} required></textarea>
  </div>

  <button type="submit" class="btn btn-success w-100" disabled={submitted}>
    {submitted ? "Sending..." : " Submit"}
  </button>
</form>
