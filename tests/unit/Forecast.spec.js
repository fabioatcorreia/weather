import { shallowMount } from "@vue/test-utils";
import Forecast from "@/components/Forecast.vue";

describe("Forecast.vue", () => {
  it("renders the correct forecast data", () => {
    const forecast = {
      date: "21 Dec 2018",
      text: "Rainy",
      high: "55",
      low: "42"
    };
    const wrapper = shallowMount(Forecast, {
      propsData: {
        data: forecast
      }
    });
    expect(wrapper.find(".description").text()).toMatch("Rainy");
  });
});
