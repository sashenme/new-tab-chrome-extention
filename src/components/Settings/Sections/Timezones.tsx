import React, { useState, useEffect } from "react";
import PlusIcon from "../../../assets/icons/PlusIcon";
import Section from "../Section";
import Timezone from "./Timezones/Timezone";
import { Formik, Form, FieldArray } from "formik";
import SelectDropdown from "../Elements/SelectDropdown";
import cityTimezones from "city-timezones";

const Button: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="bg-black hover:bg-gray-900 rounded-full px-4 py-2 flex items-center gap-1 w-full max-w-[8rem] mx-auto mt-4"
  >
    <PlusIcon />
    <span>Add timezone</span>
  </button>
);

const Timezones = ({ onToggle, isActive }) => {
  const [cities, setCities] = useState([]);


  useEffect(() => {
    const cityMapping = cityTimezones.cityMapping;
    let citiesOptions = [];
    cityMapping.forEach((city) => {
      citiesOptions.push({
        label: `${city.city}, ${city.country}`,
        value: city.timezone,
      });
    });
    setCities(citiesOptions);
  }, []);

  return (
    <Section title={"Timezones"} onToggle={onToggle} isActive={isActive}>
      <Formik
        initialValues={{
          favoriteZone: [
            { label: "Colombo, Sri Lanka", value: "Asia/Colombo" },
          ],
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          isValid,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            <FieldArray
              name="favoriteZone"
              render={(arrayHelpers) => (
                <>
                  {values.favoriteZone.map((zone, index) => (
                    <div className="grid gap-2 mt-4" key={`zone-${index}`}>
                      {cities.length > 0 && (
                        <Timezone
                          key={index}
                          city={"Mokak"}
                          timezone="hehhe"
                          country={"Ashikland"}
                          name={`favoriteZone[${index}].type`}
                          options={cities}
                          value={cities.filter(
                            (option) => option.label === zone.label
                          )}
                          defaultValue={cities.filter(
                            (option) => option.label === zone.label
                          )}
                          onChange={(values) => {
                            setFieldValue(
                              `favoriteZone.${index}.value`,
                              values.value
                            );
                            setFieldValue(
                              `favoriteZone.${index}.label`,
                              values.label
                            );
                          }}
                          onBlur={() =>
                            setFieldTouched(`favoriteZone.${index}.value`, true)
                          }
                          onDelete={() => arrayHelpers.remove(index)}
                        />
                      )}
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        label: "Matara, Sri Lanka",
                        value: "Asia/Colombo",
                      })
                    }
                  />
                </>
              )}
            />
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="bg-green-400 px-2 py-1"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Section>
  );
};

export default Timezones;
