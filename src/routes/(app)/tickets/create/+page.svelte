<script lang="ts">
  let { data } = $props();

  // svelte-ignore non_reactive_update
  let title = '';
  // svelte-ignore non_reactive_update
  let description = '';
  // svelte-ignore non_reactive_update
  let priority = 'MEDIUM';
</script>
<h1>Create Ticket</h1>

<form method="POST">

  <div>
    <label for="title">Title</label>
    <input
      id="title"
      name="title"
      type="text"
      bind:value={title}
      required
    />
  </div>

  <div>
    <label for="description">Description</label>
    <textarea
      id="description"
      name="description"
      bind:value={description}
      required
    ></textarea>
  </div>

  <label for="department">Department</label>

    <select id="department" name="department">
    {#each data.departments as department}
        <option value={department.id}>
        {department.name}
        </option>
    {/each}
    </select>

  <div>
    <label for="category">Category</label>

    <select id="category" name="category">
      {#each data.categories as category}
        <option value={category.id}>
          {category.name}
        </option>
      {/each}
    </select>
  </div>

  <div>
    <label for="priority">Priority</label>

    <select
      id="priority"
      name="priority"
      bind:value={priority}
    >
      <option value="LOW">Low</option>
      <option value="MEDIUM">Medium</option>
      <option value="HIGH">High</option>
      <option value="URGENT">Urgent</option>
    </select>
  </div>

  <button type="submit">
    Create Ticket
  </button>

</form>