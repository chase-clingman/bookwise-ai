<template>
  <q-page padding>
    <div style="max-width: 1200px" class="center">
      <div class="center">
        <img
          alt="BookWise Logo"
          src="book.png"
          style="width: 200px; height: 200px"
          class="center"
        />
        <h2
          class="bigFont text-h3 q-mb-lg text-center"
          style="font-weight: bold; margin-top: 0"
        >
          Master Books in Minutes
        </h2>
      </div>
      <!-- <div class="text-h3 text-primary q-mb-lg">Summarize any book</div> -->
      <q-form style="width: 100%; max-width: 650px" class="form center">
        <q-select
          rounded
          outlined
          v-model="selectedBook"
          :options="filteredBooks"
          :input-value="inputValue"
          @input-value="
            (val) => {
              inputValue = val;
            }
          "
          @new-value="bookSelected"
          @change="navigateToBook"
          label="Enter Book Title or Author"
          style="width: 100%; max-width: 650px"
          class="input-container"
          use-input
          input-debounce="300"
          hide-dropdown-icon
          @filter="searchBooks"
        >
          <template v-slot:append>
            <q-btn
              flat
              class="arrow"
              icon="search"
              round
              type="submit"
              @click="inputResponse"
            />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results found
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-form>
      <!-- trending section -->
      <div class="suggestions q-mt-lg lt-md" style="max-width: 1000px">
        <h6 class="text-h5 bigFont text-left q-mt-lg" style="z-index: 5">
          Trending Book Summaries
        </h6>
        <q-scroll-area style="height: 250px; width: 100%">
          <div class="row">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('To Kill a Mocking Bird by Harper Lee')
                "
              >
                <q-img
                  class="col-6"
                  src="tokillamockingbird.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  To Kill a Mocking...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Harper Lee
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Great Gatsby by F. Scott Fitzgerald')
                "
              >
                <q-img
                  class="col-6"
                  src="gatsby.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Great Gatsby
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: F. Scott Fitzge...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Fahrenheit 451 by Ray Bradbury')"
              >
                <q-img
                  class="col-6"
                  src="61eG0lnMXPS._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Fahrenheit 451
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Ray Bradbury
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Hunger Games by Suzanne Collins')"
              >
                <q-img
                  class="col-6"
                  src="51vOc7NtICL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Hunger Games
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Suzanne Collins
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('1984 by George Orwell')"
              >
                <q-img
                  class="col-6"
                  src="1984.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  1984
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: George Orwell
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Animal Farm by George Orwell')"
              >
                <q-img
                  class="col-6"
                  src="animalfarm.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Animal Farm
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: George Orwell
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Alchemist by Paulo Coelho')"
              >
                <q-img
                  class="col-6"
                  src="517pfctTa9L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Alchemist
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Paulo Coelho
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Lord of the Flies by William Golding')
                "
              >
                <q-img
                  class="col-6"
                  src="lordoftheflies.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Lord of the Flies
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: William Golding
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Giver by Lois Lowry')"
              >
                <q-img
                  class="col-6"
                  src="51BU9DLDmyL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Giver
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Lois Lowry
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Holes by Louis Sachar')"
              >
                <q-img
                  class="col-6"
                  src="51Zg0HeEv9L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Holes
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Louis Sachar
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Wrinkle in Time by Madeleine LEngle')
                "
              >
                <q-img
                  class="col-6"
                  src="61Pl0vLNfDL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Wrinkle in Time
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Madeleine LEngle
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Lion, the Witch and the Wardrobe by C.S. Lewis'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51gOejv1j1L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Lion, the Wit...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: C.S. Lewis
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Romeo and Juliet by William Shakespeare')
                "
              >
                <q-img
                  class="col-6"
                  src="51w3bWUlSzL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Romeo and Juliet
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: William Shakes...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Of Mice and Men by John Steinbeck')
                "
              >
                <q-img
                  class="col-6"
                  src="51q+fvot+fL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Of Mice and Men
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: John Steinbeck
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Pride and Prejudice by Jane Austen')
                "
              >
                <q-img
                  class="col-6"
                  src="51paQ5XGqQL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Pride and Prejudice
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jane Austen
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Brave New World by Aldous Huxley')"
              >
                <q-img
                  class="col-6"
                  src="51PpzUbiLeL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Brave New World
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Aldous Huxley
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Odyssey by Homer')"
              >
                <q-img
                  class="col-6"
                  src="516x4wGLoqL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Odyssey
                </div>
                <div class="text-left" style="font-size: 14px">By: Homer</div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Catcher in the Rye by J.D. Salinger')
                "
              >
                <q-img
                  class="col-6"
                  src="61fgOuZfBGL._AC_UF1000,1000_QL80_.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Catcher in th...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: J.D. Salinger
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Scarlet Letter by Nathaniel Hawthorne'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51I2V703XzL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Scarlet Letter
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Nathaniel Hawt...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Moby Dick by Herman Melville')"
              >
                <q-img
                  class="col-6"
                  src="51j7zrSt+VL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Moby Dick
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Herman Melville
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="suggestions q-mt-lg center gt-sm" style="max-width: 1000px">
        <h6 class="text-h5 bigFont text-left q-mt-lg" style="z-index: 5">
          Trending Book Summaries
        </h6>
        <q-carousel
          v-model="trending"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          control-type="regular"
          height="300px"
          class="rounded-borders"
          style="margin-top: -25px"
        >
          <q-carousel-slide :name="1" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('To Kill a Mocking Bird by Harper Lee')
                "
              >
                <q-img
                  class="col-6"
                  src="tokillamockingbird.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  To Kill a Mocking...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Harper Lee
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Great Gatsby by F. Scott Fitzgerald')
                "
              >
                <q-img
                  class="col-6"
                  src="gatsby.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Great Gatsby
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: F. Scott Fitzge...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Fahrenheit 451 by Ray Bradbury')"
              >
                <q-img
                  class="col-6"
                  src="61eG0lnMXPS._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Fahrenheit 451
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Ray Bradbury
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Hunger Games by Suzanne Collins')"
              >
                <q-img
                  class="col-6"
                  src="51vOc7NtICL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Hunger Games
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Suzanne Collins
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('1984 by George Orwell')"
              >
                <q-img
                  class="col-6"
                  src="1984.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  1984
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: George Orwell
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Animal Farm by George Orwell')"
              >
                <q-img
                  class="col-6"
                  src="animalfarm.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Animal Farm
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: George Orwell
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Alchemist by Paulo Coelho')"
              >
                <q-img
                  class="col-6"
                  src="517pfctTa9L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Alchemist
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Paulo Coelho
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Lord of the Flies by William Golding')
                "
              >
                <q-img
                  class="col-6"
                  src="lordoftheflies.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Lord of the Flies
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: William Golding
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Giver by Lois Lowry')"
              >
                <q-img
                  class="col-6"
                  src="51BU9DLDmyL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Giver
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Lois Lowry
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Holes by Louis Sachar')"
              >
                <q-img
                  class="col-6"
                  src="51Zg0HeEv9L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Holes
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Louis Sachar
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Wrinkle in Time by Madeleine LEngle')
                "
              >
                <q-img
                  class="col-6"
                  src="61Pl0vLNfDL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Wrinkle in Time
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Madeleine LEngle
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Lion, the Witch and the Wardrobe by C.S. Lewis'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51gOejv1j1L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Lion, the Wit...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: C.S. Lewis
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Romeo and Juliet by William Shakespeare')
                "
              >
                <q-img
                  class="col-6"
                  src="51w3bWUlSzL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Romeo and Juliet
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: William Shakes...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Of Mice and Men by John Steinbeck')
                "
              >
                <q-img
                  class="col-6"
                  src="51q+fvot+fL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Of Mice and Men
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: John Steinbeck
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Pride and Prejudice by Jane Austen')
                "
              >
                <q-img
                  class="col-6"
                  src="51paQ5XGqQL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Pride and Prejudice
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jane Austen
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="4" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Brave New World by Aldous Huxley')"
              >
                <q-img
                  class="col-6"
                  src="51PpzUbiLeL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Brave New World
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Aldous Huxley
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Odyssey by Homer')"
              >
                <q-img
                  class="col-6"
                  src="516x4wGLoqL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Odyssey
                </div>
                <div class="text-left" style="font-size: 14px">By: Homer</div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Catcher in the Rye by J.D. Salinger')
                "
              >
                <q-img
                  class="col-6"
                  src="61fgOuZfBGL._AC_UF1000,1000_QL80_.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Catcher in th...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: J.D. Salinger
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Scarlet Letter by Nathaniel Hawthorne'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51I2V703XzL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Scarlet Letter
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Nathaniel Hawt...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Moby Dick by Herman Melville')"
              >
                <q-img
                  class="col-6"
                  src="51j7zrSt+VL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Moby Dick
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Herman Melville
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>

      <!-- suggested section -->
      <div class="suggestions q-mt-lg lt-md" style="max-width: 1000px">
        <h6 class="text-h5 bigFont text-left q-mt-lg" style="z-index: 5">
          Suggested Book Summaries
        </h6>
        <q-scroll-area style="height: 250px; width: 100%">
          <div class="row">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Atomic Habits by James Clear')"
              >
                <q-img
                  class="col-6"
                  src="atomic.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Atomic Habits
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: James Clear
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Harry Potter and the Sorcerers Stone by J.K. Rowling'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="harry.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Harry Potter and t...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: J.K. Rowling
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Cant Hurt Me by David Goggins')"
              >
                <q-img
                  class="col-6"
                  src="hurt.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Can't Hurt Me
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Goggins
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('48 Laws Of Power by Robert Greene')
                "
              >
                <q-img
                  class="col-6"
                  src="power.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  48 Laws Of Power
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Robert Greene
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Subtle Art of Not Giving a F*ck by Mark Manson'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="subtle.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Subtle Art of...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Mark Manson
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Seven Husbands of Evelyn Hugo by Taylor Jenkins'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="seven.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Seven Husban...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Taylor Jenkins...
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Never Finished by David Goggins')"
              >
                <q-img
                  class="col-6"
                  src="never.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Never Finished
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Goggins
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('12 Rules for Life by Jordan B. Peterson')
                "
              >
                <q-img
                  class="col-6"
                  src="rules.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  12 Rules for Life
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jordan B. Peter...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Outlander by Diana Gabaldon')"
              >
                <q-img
                  class="col-6"
                  src="outlander.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Outlander
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Diana Gabaldon
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('War and Peace by Leo Tolstoy')"
              >
                <q-img
                  class="col-6"
                  src="51K-U7lZIvL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  War and Peace
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Leo Tolstoy
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'A Brief History of Time by Stephen Hawking'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="513UmJY4jbL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  A Brief History of...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Stephen Hawking
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('In Search of Lost Time by Marcel Proust')
                "
              >
                <q-img
                  class="col-6"
                  src="51uM9GQagQL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  In Search of Lost...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Marcel Proust
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Thinking Fast and Slow by Daniel Kahneman'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="4150eh0V-rL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Thinking Fast and...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Daniel Kahneman
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('A Tale of Two Cities by Charles Dickens')
                "
              >
                <q-img
                  class="col-6"
                  src="51EXuEOQIiL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  A Tale of Two Cities
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Charles Dickens
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Da Vinci Code by Dan Brown')"
              >
                <q-img
                  class="col-6"
                  src="51riEVXta5L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Da Vinci Code
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Dan Brown
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Guns Germs and Steel by Jared Diamond')
                "
              >
                <q-img
                  class="col-6"
                  src="51Oi+FcrkKL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Guns Germs and...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jared Diamond
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Beloved by Toni Morrison')"
              >
                <q-img
                  class="col-6"
                  src="51pRhxp9r+L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Beloved
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Toni Morrison
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Art of War by Sun Tzu')"
              >
                <q-img
                  class="col-6"
                  src="51no+g+ttWL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Art of War
                </div>
                <div class="text-left" style="font-size: 14px">By: Sun Tzu</div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Blink by Malcolm Gladwell')"
              >
                <q-img
                  class="col-6"
                  src="417cu5MG5QL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Blink
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Malcolm Gladwell
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Infinite Jest by David Foster Wallace')
                "
              >
                <q-img
                  class="col-6"
                  src="51QzhNnomTL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Infinite Jest
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Foster...
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="suggestions q-mt-lg center gt-sm" style="max-width: 1000px">
        <h6 class="text-h5 bigFont text-left q-mt-lg" style="z-index: 5">
          Suggested Book Summaries
        </h6>
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          control-type="regular"
          height="300px"
          class="rounded-borders"
          style="margin-top: -25px"
        >
          <q-carousel-slide :name="1" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Atomic Habits by James Clear')"
              >
                <q-img
                  class="col-6"
                  src="atomic.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Atomic Habits
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: James Clear
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Harry Potter and the Sorcerers Stone by J.K. Rowling'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="harry.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Harry Potter and t...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: J.K. Rowling
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Cant Hurt Me by David Goggins')"
              >
                <q-img
                  class="col-6"
                  src="hurt.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Can't Hurt Me
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Goggins
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('48 Laws Of Power by Robert Greene')
                "
              >
                <q-img
                  class="col-6"
                  src="power.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  48 Laws Of Power
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Robert Greene
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Subtle Art of Not Giving a F*ck by Mark Manson'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="subtle.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Subtle Art of...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Mark Manson
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Seven Husbands of Evelyn Hugo by Taylor Jenkins'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="seven.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Seven Husban...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Taylor Jenkins...
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Never Finished by David Goggins')"
              >
                <q-img
                  class="col-6"
                  src="never.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Never Finished
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Goggins
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('12 Rules for Life by Jordan B. Peterson')
                "
              >
                <q-img
                  class="col-6"
                  src="rules.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  12 Rules for Life
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jordan B. Peter...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Outlander by Diana Gabaldon')"
              >
                <q-img
                  class="col-6"
                  src="outlander.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Outlander
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Diana Gabaldon
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('War and Peace by Leo Tolstoy')"
              >
                <q-img
                  class="col-6"
                  src="51K-U7lZIvL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  War and Peace
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Leo Tolstoy
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'A Brief History of Time by Stephen Hawking'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="513UmJY4jbL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  A Brief History of...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Stephen Hawking
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('In Search of Lost Time by Marcel Proust')
                "
              >
                <q-img
                  class="col-6"
                  src="51uM9GQagQL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  In Search of Lost...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Marcel Proust
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Thinking Fast and Slow by Daniel Kahneman'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="4150eh0V-rL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Thinking Fast and...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Daniel Kahneman
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('A Tale of Two Cities by Charles Dickens')
                "
              >
                <q-img
                  class="col-6"
                  src="51EXuEOQIiL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  A Tale of Two Cities
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Charles Dickens
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Da Vinci Code by Dan Brown')"
              >
                <q-img
                  class="col-6"
                  src="51riEVXta5L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Da Vinci Code
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Dan Brown
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="4" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Guns Germs and Steel by Jared Diamond')
                "
              >
                <q-img
                  class="col-6"
                  src="51Oi+FcrkKL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Guns Germs and...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jared Diamond
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Beloved by Toni Morrison')"
              >
                <q-img
                  class="col-6"
                  src="51pRhxp9r+L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Beloved
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Toni Morrison
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Art of War by Sun Tzu')"
              >
                <q-img
                  class="col-6"
                  src="51no+g+ttWL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Art of War
                </div>
                <div class="text-left" style="font-size: 14px">By: Sun Tzu</div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Blink by Malcolm Gladwell')"
              >
                <q-img
                  class="col-6"
                  src="417cu5MG5QL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Blink
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Malcolm Gladwell
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Infinite Jest by David Foster Wallace')
                "
              >
                <q-img
                  class="col-6"
                  src="51QzhNnomTL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Infinite Jest
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Foster...
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>

      <!-- self help books -->
      <div class="suggestions q-mt-lg lt-md" style="max-width: 1000px">
        <h6 class="text-h5 bigFont text-left q-mt-lg" style="z-index: 5">
          Self Imporvement Book Summaries
        </h6>
        <q-scroll-area style="height: 250px; width: 100%">
          <div class="row">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
            <div
                class="bookDiv col"
                @click="navigateToBookTitle('How To Win Friends and Influence People by Dale Carnegie')"
              >
                <q-img
                  class="col-6"
                  src="41EonTXncLL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  How To Win Frien...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Dale Carnegie
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Think and Grow Rich by Napoleon Hill'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="thinkandgrowrich.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Think and Grow R...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Napoleon Hill
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Meditations by Marcus Aurelius')"
              >
                <q-img
                  class="col-6"
                  src="meditations.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Meditations
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Marcus Aurelius
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Power of Habit by Charles Duhigg')
                "
              >
                <q-img
                  class="col-6"
                  src="41-zoyxnXiL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Power of Habit
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Charles Duhigg
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Four Agreements by Don Miguel Ruiz'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="61bzSxyLLlL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Four Agree...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Don Miguel Ruiz
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The 7 Habits of Highly Effective People by Stephen R. Covey'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51OuvCFwyZL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The 7 Habits of...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Stephen R. Covey
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Man Search For Meaning by Viktor E. Frankl')"
              >
                <q-img
                  class="col-6"
                  src="41QyFpuBhfL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Man's Search For...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Viktor E. Frankl
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('12 Rules for Life by Jordan B. Peterson')
                "
              >
                <q-img
                  class="col-6"
                  src="rules.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  12 Rules for Life
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jordan B. Peter...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('mindset by Carol S. Dweck')"
              >
                <q-img
                  class="col-6"
                  src="510Y57m6XJL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  mindset
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Carol S. Dweck
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Emotional Intelligence by Daniel Goleman')"
              >
                <q-img
                  class="col-6"
                  src="51eYN7dRy2L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Emotional Intellig...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Daniel Goleman
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Getting Things Done by David Allen'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51bGhYfO9KL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Getting Things Done
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Allen
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('100M Offers by Alex Hormozi')
                "
              >
                <q-img
                  class="col-6"
                  src="41GqbVAnxeL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  100M Offers
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Alex Hormozi
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Power of Now by Eckhart Tolle'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51wk62SpJaL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Power of Now
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Eckhart Tolle
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Rich Dad Poor Dad by Robert T. Kiyosaki')
                "
              >
                <q-img
                  class="col-6"
                  src="51NuMV9SJ8L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Rich Dad Poor Dad
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Robert T. Kiyosaki
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Magic of Thinking Big by David J. Schwartz')"
              >
                <q-img
                  class="col-6"
                  src="51k+fIINMlL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Magic of Think...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David J. Schwartz
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Power of Positive Thinking by Norman Vincent Peale')
                "
              >
                <q-img
                  class="col-6"
                  src="51yDrRjhO1L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Power of Posit...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Norman Vincent...
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Outliers by Malcolm Gladwell')"
              >
                <q-img
                  class="col-6"
                  src="41NOnaoU9sL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Outliers
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Malcolm Gladwell
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Lean Startup by Eric Ries')"
              >
                <q-img
                  class="col-6"
                  src="leanstartup.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Lean Startup
                </div>
                <div class="text-left" style="font-size: 14px">By: Eric Ries</div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Steve Jobs by Walter Isaacson')"
              >
                <q-img
                  class="col-6"
                  src="51S2iJN3DYL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Steve Jobs
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Walter Isaacson
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Zero to One by Peter Thiel and Blake Masters')
                "
              >
                <q-img
                  class="col-6"
                  src="zerotoone.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Zero to One
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Peter Thiel and...
                </div>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <div class="suggestions q-mt-lg center gt-sm" style="max-width: 1000px">
        <h6 class="text-h5 bigFont text-left q-mt-lg" style="z-index: 5">
          Self Imporvement Book Summaries
        </h6>
        <q-carousel
          v-model="clingman"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="primary"
          navigation
          padding
          arrows
          control-type="regular"
          height="300px"
          class="rounded-borders"
          style="margin-top: -25px"
        >
          <q-carousel-slide :name="1" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('How To Win Friends and Influence People by Dale Carnegie')"
              >
                <q-img
                  class="col-6"
                  src="41EonTXncLL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  How To Win Frien...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Dale Carnegie
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Think and Grow Rich by Napoleon Hill'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="thinkandgrowrich.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Think and Grow R...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Napoleon Hill
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Meditations by Marcus Aurelius')"
              >
                <q-img
                  class="col-6"
                  src="meditations.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Meditations
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Marcus Aurelius
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Power of Habit by Charles Duhigg')
                "
              >
                <q-img
                  class="col-6"
                  src="41-zoyxnXiL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Power of Habit
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Charles Duhigg
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Four Agreements by Don Miguel Ruiz'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="61bzSxyLLlL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Four Agree...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Don Miguel Ruiz
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The 7 Habits of Highly Effective People by Stephen R. Covey'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51OuvCFwyZL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The 7 Habits of...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Stephen R. Covey
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Man Search For Meaning by Viktor E. Frankl')"
              >
                <q-img
                  class="col-6"
                  src="41QyFpuBhfL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Man's Search For...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Viktor E. Frankl
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('12 Rules for Life by Jordan B. Peterson')
                "
              >
                <q-img
                  class="col-6"
                  src="rules.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  12 Rules for Life
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Jordan B. Peter...
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('mindset by Carol S. Dweck')"
              >
                <q-img
                  class="col-6"
                  src="510Y57m6XJL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  mindset
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Carol S. Dweck
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Emotional Intelligence by Daniel Goleman')"
              >
                <q-img
                  class="col-6"
                  src="51eYN7dRy2L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Emotional Intellig...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Daniel Goleman
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="3" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'Getting Things Done by David Allen'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51bGhYfO9KL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Getting Things Done
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David Allen
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('100M Offers by Alex Hormozi')
                "
              >
                <q-img
                  class="col-6"
                  src="41GqbVAnxeL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  100M Offers
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Alex Hormozi
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle(
                    'The Power of Now by Eckhart Tolle'
                  )
                "
              >
                <q-img
                  class="col-6"
                  src="51wk62SpJaL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Power of Now
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Eckhart Tolle
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Rich Dad Poor Dad by Robert T. Kiyosaki')
                "
              >
                <q-img
                  class="col-6"
                  src="51NuMV9SJ8L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Rich Dad Poor Dad
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Robert T. Kiyosaki
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Magic of Thinking Big by David J. Schwartz')"
              >
                <q-img
                  class="col-6"
                  src="51k+fIINMlL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Magic of Think...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: David J. Schwartz
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide :name="4" class="column no-wrap">
            <div
              class="row fit justify-start items-center q-gutter-sm q-col-gutter no-wrap"
            >
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('The Power of Positive Thinking by Norman Vincent Peale')
                "
              >
                <q-img
                  class="col-6"
                  src="51yDrRjhO1L._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Power of Posit...
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Norman Vincent...
                </div>
              </div>

              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Outliers by Malcolm Gladwell')"
              >
                <q-img
                  class="col-6"
                  src="41NOnaoU9sL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Outliers
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Malcolm Gladwell
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('The Lean Startup by Eric Ries')"
              >
                <q-img
                  class="col-6"
                  src="leanstartup.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  The Lean Startup
                </div>
                <div class="text-left" style="font-size: 14px">By: Eric Ries</div>
              </div>
              <div
                class="bookDiv col"
                @click="navigateToBookTitle('Steve Jobs by Walter Isaacson')"
              >
                <q-img
                  class="col-6"
                  src="51S2iJN3DYL._SL250_FMwebp_.webp"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Steve Jobs
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Walter Isaacson
                </div>
              </div>
              <div
                class="bookDiv col"
                @click="
                  navigateToBookTitle('Zero to One by Peter Thiel and Blake Masters')
                "
              >
                <q-img
                  class="col-6"
                  src="zerotoone.jpg"
                  style="height: 150px; width: 150px; border-radius: 10px"
                />
                <div class="bigFont text-left q-mt-sm" style="font-size: 16px">
                  Zero to One
                </div>
                <div class="text-left" style="font-size: 14px">
                  By: Peter Thiel and...
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "src/boot/firebase";

import { ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      OPENAI_API_KEY: "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",
      messages: [],

      input: "",
      error: "",
      response: "",
      bookTitle: "",

      role: "",

      surveyDialog: false,
      survey: false,

      books: [],

      slide: ref(1),
      clingman: ref(1),
      trending: ref(1),

      selectedBook: null,
      inputValue: "",
      filteredBooks: [],
    };
  },
  mounted() {},
  methods: {
    async completionCall(input) {
      let messages = [];
      messages.push({ role: "user", content: input });

      const apiKey = process.env.OPENAI_API_KEY || this.OPENAI_API_KEY;
      const apiEndpoint = "https://api.openai.com/v1/chat/completions"; // Update the endpoint according to the API version you're using

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const data = {
        model: "gpt-4",
        messages: messages,
      };

      let attempts = 3;
      let success = false;

      while (attempts > 0 && !success) {
        try {
          const response = await axios.post(apiEndpoint, data, { headers });
          const completion = response.data;
          this.response = completion.choices[0].message.content;
          messages.push({
            role: completion.choices[0].message.role,
            content: this.response,
          });
          console.log(this.response);
          success = true;
        } catch (error) {
          console.error("API call failed:", error);
          attempts--;
          if (attempts > 0) {
            console.log("Retrying... attempts left:", attempts);
          }
        }
      }

      if (!success) {
        console.error("Failed after 3 attempts");
        // Handle the case when all attempts fail
      }
    },
    inputResponse() {
      try {
        document.querySelector(".loading").style.display = "block";
        document.querySelector(".fail").style.opacity = "0";
        document.querySelector(".fail").style.display = "none";
        document.querySelector(".createDiv").style.display = "none";

        if (this.books.length > 0) {
          const firstBook = this.books[0];
          this.bookTitle =
            firstBook.volumeInfo.title +
            ": " +
            firstBook.volumeInfo.subtitle +
            ", by " +
            firstBook.volumeInfo.authors[0];

          document.querySelector(".loading").style.display = "none";
          document.querySelector(".createDiv").style.display = "block";
          document.querySelector(".createBtn").style.opacity = "1";
        } else {
          throw new Error("No books found");
        }
      } catch (error) {
        console.error("Error:", error);
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".fail").style.opacity = "1";
        document.querySelector(".fail").style.display = "block";
        this.error = "An error occurred. Please try again.";
        this.messages = [];
      }
    },

    async createSummary() {
      this.bookMethod();
    },
    errorCall() {
      this.input = this.error;
      this.inputResponse();
    },
    async bookMethod() {
      try {
        const docRef = doc(db, "gpt4", this.bookTitle);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.$router.push("/books/" + encodeURIComponent(this.bookTitle));
        } else {
          try {
            await setDoc(doc(db, "gpt4", this.bookTitle), {
              input: this.bookTitle,
              date: new Date(),
              chaptersDone: false,
            });

            console.log("Document written with ID: ", this.bookTitle);
            this.$router.push("/books/" + encodeURIComponent(this.bookTitle));
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },

    async searchBooks(val, update) {
      update(async () => {
        if (val.length > 2) {
          try {
            const response = await axios.get(
              "https://www.googleapis.com/books/v1/volumes",
              {
                params: {
                  q: val,
                  key: "AIzaSyAbl2KFA_qtg5YLvypJZR8Ec8Xt29ofVX0",
                },
              }
            );
            this.books = response.data.items;
            this.filteredBooks = this.books.map((book) => ({
              label: `${book.volumeInfo.title} ${
                book.volumeInfo.authors
                  ? "by " + book.volumeInfo.authors[0]
                  : ""
              }`,
              value: book,
            }));
            // Ensure the current input value is present in the options
            if (!this.filteredBooks.find((option) => option.label === val)) {
              this.filteredBooks.push({
                label: val,
                value: { volumeInfo: { title: val } },
              });
            }
          } catch (error) {
            console.error("Error fetching books:", error);
          }
        } else {
          this.filteredBooks = [];
        }
      });
    },

    bookSelected(book) {
      this.$router.push(
        "/books/" +
          encodeURIComponent(
            book.volumeInfo.title + " " + book.volumeInfo.authors[0]
          )
      );
    },
    async navigateToBook() {
      // wait 1 second
      await new Promise((resolve) => setTimeout(resolve, 200));
      console.log(this.selectedBook.label);
      try {
        const docRef = doc(db, "gpt4", this.selectedBook.label);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.$router.push(
            "/books/" + encodeURIComponent(this.selectedBook.label)
          );
        } else {
          try {
            await setDoc(doc(db, "gpt4", this.selectedBook.label), {
              input: this.selectedBook.label,
              date: new Date(),
              chaptersDone: false,
            });

            console.log("Document written with ID: ", this.selectedBook.label);
            this.$router.push(
              "/books/" + encodeURIComponent(this.selectedBook.label)
            );
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    async navigateToBookTitle(title) {
      // wait 1 second
      // await new Promise((resolve) => setTimeout(resolve, 200));
      // console.log(this.selectedBook.label);
      try {
        const docRef = doc(db, "gpt4", title);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.$router.push("/books/" + encodeURIComponent(title));
        } else {
          try {
            await setDoc(doc(db, "gpt4", title), {
              input: title,
              date: new Date(),
              chaptersDone: false,
            });

            console.log("Document written with ID: ", title);
            this.$router.push("/books/" + encodeURIComponent(title));
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },

    selectBook(book) {
      this.input = book.volumeInfo.title + " " + book.volumeInfo.authors[0];
      this.inputResponse();
      this.books = [];
    },
  },
});
</script>
<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  margin-left: auto;
  margin-right: auto;
}

.input-container .arrow {
  cursor: pointer;
  transition: 0.4s all;
}
.input-container:hover .arrow {
  color: #000;
}
.fail {
  transition: 0.4s all;
}
.form {
  transition: 0.4s all;
}
.createBtn {
  /* create a gradient from blue to red left to right */
  background: linear-gradient(90deg, #4084e6, #ff0970);
  color: white;
  opacity: 0;
  transition: 0.4s all;
  /* add spacing between letters */
}
.createBtn:hover {
  background: linear-gradient(90deg, #4084e6, #ff0970);
  color: white;
}
.createDiv {
  transition: 0.4s all;
}
.loading {
  display: none;
  transition: 0.4s all;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding: 0;
  margin: 0;
}

.book-item {
  width: 150px;
  min-width: 150px;
  cursor: pointer;
  transition: 0.4s all;
}
.book-item:hover {
  background-color: #eee;
}

.book-thumbnail img {
  max-width: 100%;
  height: auto;
  margin-bottom: 5px;
}

.bookDiv {
  padding: 10px;
  transition: 0.5s all;
}
.bookDiv:hover {
  transform: scale(1.02); /* slightly scale up the card */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  cursor: pointer;
}
</style>
