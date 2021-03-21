<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { CharacterActivityDefinition } from "./types";

  const dispatch = createEventDispatcher();

  export let id: string;
  export let characterData: CharacterActivityDefinition;

  $: ({ isActivated, note } = characterData || {
    isActivated: false,
    note: "",
  });

  $: checked = isActivated;

  const handleToggle = () => dispatch("toggleActivity");
</script>

<div on:click|preventDefault={handleToggle}>
  <input class="tgl-input" {id} type="checkbox" {checked} />
  <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for={id} />
</div>

<style>
  .tgl-input {
    display: none;
  }

  .tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    font-family: sans-serif;
    perspective: 100px;
  }

  .tgl-btn:after,
  .tgl-btn:before {
    display: inline-block;
    transition: all 0.4s ease;
    width: 100%;
    text-align: center;
    position: absolute;
    line-height: 2em;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    border-radius: 4px;
  }

  .tgl-btn:after {
    content: attr(data-tg-on);
    background: #02c66f;
    transform: rotateY(-180deg);
  }

  .tgl-btn:before {
    background: #ff3a19;
    content: attr(data-tg-off);
  }

  .tgl-btn:active:before {
    transform: rotateY(-20deg);
  }

  .tgl-input:checked + .tgl-btn:before {
    transform: rotateY(180deg);
  }

  .tgl-input:checked + .tgl-btn:after {
    transform: rotateY(0);
    left: 0;
    background: #7fc6a6;
  }

  .tgl-input:checked + .tgl-btn:active:after {
    transform: rotateY(20deg);
  }
</style>
