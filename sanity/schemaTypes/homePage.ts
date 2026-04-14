import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      type: "object",
      fields: [
        defineField({ name: "avatars", type: "array", of: [defineArrayMember({ type: "string" })] }),
        defineField({ name: "label", type: "string" }),
      ],
    }),
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({
          name: "titleLines",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "text", type: "string" }),
                defineField({
                  name: "color",
                  type: "string",
                  options: {
                    list: [
                      { title: "Dark", value: "htdark" },
                      { title: "Teal", value: "teal" },
                      { title: "Orange", value: "orange" },
                    ],
                  },
                }),
              ],
            }),
          ],
        }),
        defineField({ name: "subtitle", type: "text", rows: 3 }),
        defineField({ name: "searchPlaceholder", type: "string" }),
        defineField({
          name: "locations",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "findSpotsLabel", type: "string" }),
      ],
    }),
    defineField({
      name: "heroTags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "ticker",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "num", type: "string" }),
            defineField({ name: "txt", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "trending",
      type: "object",
      fields: [
        defineField({ name: "kicker", type: "string" }),
        defineField({ name: "badge", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "headingAccent", type: "string" }),
        defineField({ name: "seeAll", type: "string" }),
      ],
    }),
    defineField({
      name: "trendingPlaceNames",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "categoryStrip",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "exploreSection",
      type: "object",
      fields: [
        defineField({ name: "kicker", type: "string" }),
        defineField({ name: "heading", type: "string" }),
        defineField({ name: "headingAccent", type: "string" }),
        defineField({ name: "headingSuffix", type: "string" }),
      ],
    }),
    defineField({
      name: "quickLinks",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "href", type: "string" }),
            defineField({ name: "emoji", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({ name: "highlight", type: "boolean" }),
          ],
        }),
      ],
    }),
  ],
});
