<template>
  <section class="flex flex-grow">
    <teleport to="#pageheader">
      <retrospective-header></retrospective-header>
    </teleport>
    <div class="flex flex-col flex-grow justify-center items-center">
      <svg
        class="text-yellow-500 fill-current z-0 opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="30em"
        height="30em"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g>
          <path
            d="M2 5.25A3.25 3.25 0 0 1 5.25 2h11.5A3.25 3.25 0 0 1 20 5.25v2.76a4.508 4.508 0 0 0-1.5.096V7h-15v9.75c0 .966.784 1.75 1.75 1.75h7.985l-.441.764a2.457 2.457 0 0 0-.28.736H5.25A3.25 3.25 0 0 1 2 16.75V5.25zM5.25 3.5A1.75 1.75 0 0 0 3.5 5.25v.25h15v-.25a1.75 1.75 0 0 0-1.75-1.75H5.25zM19.857 9a3.496 3.496 0 0 0-3.356 1.736a3.5 3.5 0 0 0 .184 3.788l-3.025 5.24a1.459 1.459 0 0 0 2.526 1.458l3.03-5.25a3.5 3.5 0 0 0 2.976-5.761l-1.65 2.858a1.167 1.167 0 1 1-2.021-1.167l1.65-2.858A3.478 3.478 0 0 0 19.857 9zm-9.554.243a.75.75 0 0 1-.046 1.06L7.86 12.5l2.397 2.197a.75.75 0 0 1-1.014 1.106l-3-2.75a.75.75 0 0 1 0-1.106l3-2.75a.75.75 0 0 1 1.06.046zm2.954 6.56l2.02-1.852a4.495 4.495 0 0 1-.008-2.91l-2.012-1.844a.75.75 0 0 0-1.014 1.106L14.64 12.5l-2.397 2.197a.75.75 0 0 0 1.014 1.106z"
          />
        </g>
        <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
      </svg>
    </div>
  </section>
</template>

<script>
import RetrospectiveHeader from "../components/retrospective/RetrospectiveHeader.vue";
export default {
  components: {
    RetrospectiveHeader
  }
};
</script>

<style></style>
