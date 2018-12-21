import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App.vue", () => {
  it("adds the correct amount of forecast elements", () => {
    const forecasts = [
      { date: "21 Dec 2018", text: "Rainy", high: "55", low: "42" }
    ];
    const wrapper = shallowMount(App);
    wrapper.setData({ forecast: forecasts });
    expect(wrapper.vm.forecast).toHaveLength(1);
  });

  it("resets the forecast elements", () => {
    const forecasts = [
      { date: "21 Dec 2018", text: "Rainy", high: "55", low: "42" }
    ];
    const wrapper = shallowMount(App);
    wrapper.setData({ forecast: forecasts });
    wrapper.vm.reset();
    expect(wrapper.vm.forecast).toHaveLength(0);
  });
});
