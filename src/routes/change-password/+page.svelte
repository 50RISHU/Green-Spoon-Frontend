<script>
 import { goto } from '$app/navigation'; let oldPassword = ''; let newPassword = ''; let confirmPassword = ''; let message = ''; let error = ''; function handleSubmit(event) { event.preventDefault(); if (!oldPassword || !newPassword || !confirmPassword) { error = '⚠️ All fields are required!'; message = ''; return; } if (newPassword !== confirmPassword) { error = '❌ New passwords do not match.'; message = ''; return; } // Simulated success message = '✅ Password updated successfully!'; error = ''; // Reset after delay and go back setTimeout(() => { goto('/profile'); }, 1500); }
</script>

<section class="container my-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-sm animate__animated animate__fadeInUp">
                <div class="card-body">
                    <h4 class="text-success text-center mb-4">
                        🔒 Change Password
                    </h4>

                    {#if error}
                        <div class="alert alert-danger">{error}</div>
                    {/if}
                    {#if message}
                        <div class="alert alert-success">{message}</div>
                    {/if}

                    <form on:submit={handleSubmit}>
                        <div class="mb-3">
                            <label class="form-label">Old Password</label>
                            <input
                                type="password"
                                class="form-control"
                                bind:value={oldPassword}
                                placeholder="Enter old password"
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label">New Password</label>
                            <input
                                type="password"
                                class="form-control"
                                bind:value={newPassword}
                                placeholder="Enter new password"
                            />
                        </div>

                        <div class="mb-3">
                            <label class="form-label"
                                >Confirm New Password</label
                            >
                            <input
                                type="password"
                                class="form-control"
                                bind:value={confirmPassword}
                                placeholder="Confirm new password"
                            />
                        </div>

                        <button type="submit" class="btn btn-success w-100"
                            >🔁 Update Password</button
                        >

                        <div class="text-center mt-3">
                            <a
                                href="/profile"
                                class="text-decoration-none text-muted"
                                >← Back to Profile</a
                            >
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    :global(body) {
        background-color: #d1ffbd;
        padding-bottom: 80px;
    }
</style>
