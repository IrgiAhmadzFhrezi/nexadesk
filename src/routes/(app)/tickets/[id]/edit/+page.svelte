<script lang="ts">
  let { data, form } = $props();

  let title = $state('');
  let description = $state('');
  let priority = $state('LOW');
  let departmentId = $state<number | null>(null);
  let categoryId = $state<number | null>(null);

  $effect(() => {
    title = data.ticket.title ?? '';
    description = data.ticket.description ?? '';
    priority = data.ticket.priority ?? 'LOW';
    departmentId = data.ticket.departmentId ?? null;
    categoryId = data.ticket.categoryId ?? null;
  });

</script>

<h1>Edit Ticket</h1>

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
    {#if form?.titleError}
        <p>{form.titleError}</p>
    {/if}
  </div>

  <div>
    <label for="description">Description</label>
    <textarea
      id="description"
      name="description"
      bind:value={description}

    ></textarea>
    {#if form?.descriptionError}
        <p>{form.descriptionError}</p>
    {/if}
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
    {#if form?.priorityError}
            <p>{form.priorityError}</p>
        {/if}
</div>

<div>
  <label for="department">Department</label>

  <select
    id="department"
    name="department"
    bind:value={departmentId}
  >
    {#each data.departments as department}
      <option value={department.id}>
        {department.name}
      </option>
    {/each}
  </select>
    {#if form?.DepartmentError}
            <p>{form.DepartmentError}</p>
        {/if}
</div>

<div>
  <label for="category">Category</label>

  <select
    id="category"
    name="category"
    bind:value={categoryId}
  >
    {#each data.categories as category}
      <option value={category.id}>
        {category.name}
      </option>
    {/each}
  </select>
    {#if form?.CategoryError}
            <p>{form.CategoryError}</p>
        {/if}
</div>

  <button type="submit">
    Save Changes
  </button>
</form>