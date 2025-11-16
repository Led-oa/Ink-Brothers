import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
  it("affiche le message correctement", () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Test Message" },
    });
    expect(wrapper.text()).toContain("Test Message");
  });
});
