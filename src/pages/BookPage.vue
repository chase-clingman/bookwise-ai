<template>
  <q-page padding>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      style="z-index: 10"
    >
      <q-btn fab icon="fa-solid fa-comment" color="primary" @click="scroll()">
        <q-menu
          transition-show="slide-left"
          transition-hide="slide-right"
          anchor="bottom start"
          self="bottom end"
          max-width="400px"
          style="
            width: 80%;
            border-radius: 30px;
            margin-left: 10px;
            height: 500px;
          "
        >
          <q-card flat style="position: absolute; bottom: 60px; width: 100%">
            <q-scroll-area
              style="height: 450px; width: 100%; overflow: auto"
              class="q-pa-sm scroll-area"
              ref="scrollAreaRef"
            >
              <q-card-section
                v-for="message in chatMessages.slice(2)"
                :key="message"
                style="width: 100%; white-space: pre-wrap"
              >
                <div
                  v-if="message.role === 'user'"
                  style="
                    float: right;
                    border-radius: 20px;
                    padding: 10px;
                    border: 1px solid var(--q-primary);
                  "
                  class="q-my-sm text-subtitle2"
                >
                  {{ message.content }}
                </div>
                <div
                  v-if="message.role === 'assistant'"
                  style="
                    float: left;
                    clear: both;
                    border-radius: 20px;
                    border: 1px solid var(--q-secondary);
                    padding: 10px;
                    position: relative;
                  "
                  class="q-my-sm text-subtitle2"
                >
                  <div
                    v-if="loadingId === chatMessages.indexOf(message)"
                    style="display: block"
                  >
                    <q-spinner-dots color="primary" size="20px" />
                  </div>
                  <div v-else>{{ message.content }}</div>
                </div>
              </q-card-section>
            </q-scroll-area>
          </q-card>
          <q-form
            style="width: 100%; max-width: 400px; position: absolute; bottom: 0"
            class="form"
          >
            <q-input
              rounded
              outlined
              v-model="chat"
              label="Ask Me Anything About The Book"
              style="width: 100%; max-width: 650px"
              class="input-container"
            >
              <template v-slot:append>
                <q-btn
                  flat
                  class="arrow"
                  icon="chevron_right"
                  round
                  type="submit"
                  @click="chatResponse(chat)"
                />
              </template>
            </q-input>
          </q-form>
        </q-menu>
      </q-btn>
    </q-page-sticky>
    <!-- content -->
    <div class="text-h5 q-ma-md" style="z-index: 2">
      {{ book }}
    </div>
    <div class="row" style="max-width: 400px">
      <q-chip
        clickable
        no-caps
        rounded
        outline
        color="primary"
        label="Summary"
        @click="getGenSum"
      />
      <q-chip
        clickable
        no-caps
        rounded
        outline
        color="primary"
        label="Author"
        @click="getAuthor()"
      />
      <q-chip
        clickable
        no-caps
        rounded
        outline
        color="primary"
        label="Related Books"
        @click="getRelated()"
      />
      <q-btn
        clickable
        flat
        round
        dense
        @click="closeBtns()"
        icon="expand_less"
        color="primary"
        class="closeBtn"
      />
    </div>
    <div class="loadingGeneralDiv q-ma-md hide" style="">
      <q-spinner size="2em" color="primary" />
    </div>
    <q-card flat class="genSumDiv hide" style="max-width: 600px">
      <q-card-section>
        <div class="text-body1 summary">
          {{ generalSummary }}
        </div>
      </q-card-section>
    </q-card>
    <q-card flat class="authorDiv hide" style="max-width: 600px">
      <q-card-section>
        <div class="text-body1 summary">
          {{ author }}
        </div>
      </q-card-section>
    </q-card>
    <q-card flat class="relatedDiv hide" style="max-width: 600px">
      <q-card-section>
        <div class="text-body1 summary">
          {{ related }}
        </div>
      </q-card-section>
    </q-card>
    <q-separator class="q-my-lg" style="z-index: 2" />
    <div
      class="loadingDiv text-center"
      style="
        width: 95%;
        height: 200vh;
        position: fixed;
        z-index: 1;
        display: none;
      "
    >
      <q-spinner-puff color="primary" size="10%" />
      <div class="text-h5 text-primary q-mt-md">Generating Experience...</div>
    </div>
    <div class="row q-gutter-md gt-sm">
      <div class="col-3">
        <div class="text-h6 q-ma-md">Chapters</div>
        <q-list>
          <q-card
            v-for="chapter in chapters"
            :key="chapter"
            class="chapterCard"
          >
            <q-card-section>
              <div class="chapter">
                {{ chapter.title }}
                <q-icon
                  v-if="chapter.summary"
                  size="0.8em"
                  color="primary"
                  name="radio_button_checked"
                  style="position: absolute; top: 10px; right: 10px"
                >
                  <q-tooltip> Summary Generated </q-tooltip>
                </q-icon>
                <q-icon
                  v-else
                  size="0.8em"
                  color="primary"
                  name="radio_button_unchecked"
                  style="position: absolute; top: 10px; right: 10px"
                >
                  <q-tooltip> Summary has not been generated </q-tooltip>
                </q-icon>
              </div>
              <q-btn
                v-if="chapter.generating !== true"
                no-caps
                rounded
                outline
                label="Summary"
                color="primary"
                @click="summaryChapter(chapter.title)"
                class="summaryBtn q-mt-md text-center q-px-lg text-h6"
                size="md"
              />
              <div
                v-if="chapter.generating === true"
                class="q-mt-md q-px-md text-primary text-body1"
              >
                <q-spinner-dots size="2em" color="primary" />
              </div>
            </q-card-section>
          </q-card>
        </q-list>
      </div>
      <div class="feed col-5">
        <div class="FeedLoading q-ma-lg" style="display: none">
          <q-spinner color="primary" size="4em" />
        </div>
        <div class="feedContent" style="display: none">
          <q-btn
            no-caps
            outline
            rounded
            class="text-body1 text-primary q-ma-md"
            @click="audioBook()"
            >Create Audio Book</q-btn
          >
          <div class="audioLoading q-mx-lg">
            <q-spinner color="primary" size="2em" />
          </div>
          <div class="audio-player">
            <q-btn flat dense @click="playAudio">
              <q-icon :name="iconName" />
            </q-btn>
            <div class="audio-controls">
              <span class="time-stamp"></span>
              <div class="progress-bar">
                <div class="progress-fill"></div>
                <div class="seek-handle"></div>
              </div>
              <span class="time-stamp-end"></span>
            </div>
          </div>

          <div class="text-h6 q-ma-md">Summary</div>
          <q-card flat class="summaryCard">
            <q-card-section>
              <div class="text-body1 summary">
                {{ summary }}
              </div>
            </q-card-section>
          </q-card>
          <div class="text-h6 q-ma-md">Key Takeaways</div>
          <q-card flat class="pointCard">
            <q-card-section>
              <q-list separator>
                <q-item v-for="point in mainPoints" :key="point" class="point">
                  <q-item-section avatar>
                    <q-icon color="primary" name="radio_button_checked" />
                  </q-item-section>
                  <q-item-section>{{ point }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
          <div class="text-h6 q-ma-md">Quotes</div>
          <q-card flat class="quotesCard">
            <q-card-section>
              <div class="text-body1 quotes">
                {{ quotes }}
              </div>
            </q-card-section>
          </q-card>
          <!-- TODO: ADD CASE STUDY SECTION -->
          <!-- <div class="text-h6 q-ma-md">Case Studies</div>

          <q-list separator>
            <q-card
              v-for="caseStudy in caseStudies"
              :key="caseStudy"
              class="point q-ma-lg q-pa-lg"
            >
              <q-item-section>{{ caseStudy }}</q-item-section>
            </q-card>
          </q-list> -->

          <!-- <div class="text-h6 q-ma-md">Analysis</div>
          <q-card flat class="summaryCard">
            <q-card-section>
              <div class="text-body1 summary">
                {{ analysis }}
              </div>
            </q-card-section>
          </q-card> -->
        </div>
      </div>
    </div>
    <div class="lt-md">
      <div class="">
        <div class="text-h6 q-ma-md">Chapters</div>
        <q-list>
          <q-card
            v-for="chapter in chapters"
            :key="chapter"
            class="chapterCard"
          >
            <q-card-section>
              <div class="chapter">
                {{ chapter.title }}
                <q-icon
                  v-if="chapter.summary"
                  size="0.8em"
                  color="primary"
                  name="radio_button_checked"
                  style="position: absolute; top: 10px; right: 10px"
                />
                <q-icon
                  v-else
                  size="0.8em"
                  color="primary"
                  name="radio_button_unchecked"
                  style="position: absolute; top: 10px; right: 10px"
                />
              </div>
              <q-btn
                v-if="chapter.generating !== true"
                no-caps
                rounded
                outline
                label="Summary"
                color="primary"
                @click="summaryChapter(chapter.title)"
                class="summaryBtn q-mt-md text-center q-px-lg text-h6"
                size="md"
              />
              <div
                v-if="chapter.generating === true"
                class="q-mt-md q-px-md text-primary text-body1"
              >
                <q-spinner-dots size="2em" color="primary" />
              </div>
            </q-card-section>
          </q-card>
        </q-list>
      </div>
      <div class="feed">
        <div class="FeedLoading q-ma-lg" style="display: none">
          <q-spinner color="primary" size="4em" />
        </div>

        <div class="feedContent" style="display: none">
          <q-btn
            no-caps
            outline
            rounded
            class="text-body1 text-primary q-ma-md"
            @click="audioBook()"
            >Create Audio Book</q-btn
          >
          <div class="audioLoading q-mx-lg">
            <q-spinner color="primary" size="2em" />
          </div>
          <div class="audio-player">
            <q-btn flat dense @click="playAudio">
              <q-icon :name="iconName" />
            </q-btn>
            <div class="audio-controls">
              <span class="time-stamp"></span>
              <div class="progress-bar">
                <div class="progress-fill"></div>
                <div class="seek-handle"></div>
              </div>
              <span class="time-stamp-end"></span>
            </div>
          </div>
          <div class="text-h6 q-ma-md">Summary</div>
          <q-card flat class="summaryCard">
            <q-card-section>
              <div class="text-body1 summary">
                {{ summary }}
              </div>
            </q-card-section>
          </q-card>
          <div class="text-h6 q-ma-md">Key Takeaways</div>
          <q-card flat class="pointCard">
            <q-card-section>
              <q-list separator>
                <q-item v-for="point in mainPoints" :key="point" class="point">
                  <q-item-section avatar>
                    <q-icon color="primary" name="radio_button_checked" />
                  </q-item-section>
                  <q-item-section>{{ point }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
          <div class="text-h6 q-ma-md">Quotes</div>
          <q-card flat class="quotesCard">
            <q-card-section>
              <div class="text-body1 quotes">
                {{ quotes }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// import { OpenAI } from "openai-streams";

import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import db from "src/boot/firebase";

import { Configuration, OpenAIApi } from "openai";

import smoothscroll from "smoothscroll-polyfill";

import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

import axios from "axios";

export default {
  name: "BookSummaryPage",
  data() {
    return {
      OPENAI_API_KEY: "",
      messages: [],

      book: "",
      chapters: [],
      summary: "",
      quotes: "",
      response: "",
      mainPoints: [],
      caseStudies: [], //THIS IS NOT IMPLEMENTED YET
      analysis: "", //THIS IS NOT IMPLEMENTED YET

      generalSummary: "",
      author: "",
      related: "",

      user: "",
      recent: [],

      chat: "",
      chatMessages: [],

      audio: null,
      iconName: "pause",
      currentChapter: "",

      loadingId: null,
    };
  },
  setup() {
    const position = ref(300);
    const scrollAreaRef = ref(null);

    return {
      position,
      scrollAreaRef,

      scroll() {
        setTimeout(() => {
          if (scrollAreaRef.value) {
            scrollAreaRef.value.setScrollPosition("vertical", position.value);
          }
          position.value = 3000;
        }, 200);
      },

      animateScroll() {
        scrollAreaRef.value.setScrollPosition("vertical", position.value, 1000);
        position.value = 3000;
      },
    };
  },
  mounted: async function () {
    const route = useRoute();
    this.book = route.params.id;
    console.log(this.book);

    // add AWS credentials

    // Checks if user is logged in, if logged in, then it will add summary to users recent array

    const docRef = doc(db, "gpt4", this.book);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().chaptersDone == false) {
        this.getChapters();
      } else {
        //this.chapters = docSnap.data().chaptersArray;

        const q = query(
          collection(db, "gpt4", this.book, "chapters"),
          orderBy("title", "asc")
        );
        const querySnapshot = await getDocs(q);

        // extract data objects from documents
        const dataObjects = querySnapshot.docs.map((doc) => doc.data());

        // custom sort function to sort data objects by numerical prefix in title
        const customSort = (a, b) => {
          const numA = parseInt(a.title.split(".")[0]);
          const numB = parseInt(b.title.split(".")[0]);
          return numA - numB;
        };

        // sort data objects using custom sort function
        const sortedDataObjects = dataObjects.sort(customSort);

        // add sorted data objects to chapters array
        this.chapters.push(...sortedDataObjects);
        this.summaryChapter(this.chapters[0].title);
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    this.chatMessages = [
      {
        role: "user",
        content:
          "You are an AI ChatBot that helps the user answer any question about " +
          this.book,
      },
      {
        role: "assistant",
        content:
          "Ok. I am an AI ChatBot that knows everything about " + this.book,
      },
    ];
  },
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
        model: "gpt-3.5-turbo", // USE THIS MODEL FOR NOW FOR FASTER RESPONSES
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
    async getChapters() {
      document.querySelector(".loadingDiv").style.display = "block";
      document.querySelector("body").style.overflow = "hidden";
      this.completionCall(
        "In a numbered list (1., 2., etc.), Please list the chapter names of the book " +
          this.book
      ).then(async () => {
        // split the response into an array of lines
        const lines = this.response.split("\n");
        // filter out empty lines
        const chapters = lines.filter((line) => line.trim() !== "");
        // set the chapters property to the filtered array
        this.chapters = chapters;
        //console.log(this.chapters);
        const chapRef = doc(db, "gpt4", this.book);
        await updateDoc(chapRef, {
          chaptersArray: this.chapters,
        });

        // make a for loop that goes through all chapters in chapters

        for (let i = 0; i < this.chapters.length; i++) {
          try {
            const docRef = await setDoc(
              doc(db, "gpt4", this.book, "chapters", this.chapters[i]),
              {
                title: this.chapters[i],
              }
            ).then((docRef) => {
              //console.log("Document written with ID: ", this.chapters[i]);
            });
          } catch (error) {
            console.error("Error adding document: ", error);
          }
        }
        const bookRef = doc(db, "gpt4", this.book);
        await updateDoc(bookRef, {
          chaptersDone: true,
        }).then(() => {
          window.location.reload();
        });
      });
    },
    // TODO: add a function that gets the summary of a chapter and streams the data
    // async fetchSummary() {
    //   const prompt =
    //     "Provide a comprehensive, long summary of " +
    //     chapter +
    //     " of " +
    //     this.book;

    //   const stream = await OpenAI("chat", {
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "user",
    //         content:
    //           '',
    //       },
    //     ],
    //   });

    //   summary = "";

    //   for await (const chunk of stream) {
    //     summary += chunk;
    //   }

    //   this.summary = summary.trim();
    //   const summaryRef = doc(db, "books", this.book, "chapters", chapter);
    //   await updateDoc(summaryRef, {
    //     summary: this.summary,
    //   });
    //   this.displayFeed();
    // },
    async summaryChapter(chapter) {
      this.prepareFeed();
      //chapter.summary = "hello";
      const chapterRef = doc(db, "gpt4", this.book, "chapters", chapter);
      const docSnap = await getDoc(chapterRef).then((docSnap) => {
        if (
          docSnap.data().summary &&
          docSnap.data().quotes &&
          docSnap.data().mainPoints
        ) {
          this.summary = docSnap.data().summary;
          this.quotes = docSnap.data().quotes;
          this.mainPoints = docSnap.data().mainPoints;
          this.caseStudies = docSnap.data().caseStudies;
          this.displayFeed();

          let nextChapter;

          for (let i = 0; i < this.chapters.length; i++) {
            if (this.chapters[i].title === chapter) {
              this.chapters[i].generating = false;
              if (i + 1 < this.chapters.length) {
                nextChapter = this.chapters[i + 1];
              }
              break;
            }
          }

          if (nextChapter) {
            // Do something with the next chapter
            this.summaryChapterBG(nextChapter.title);
          } else {
            // No next chapter found
            console.log("no next chapter");
          }
        } else {
          for (let i = 0; i < this.chapters.length; i++) {
            if (this.chapters[i].title === chapter) {
              this.chapters[i].generating = true;
            }
          }
          this.completionCall(
            "proivide a comprehensive, long summary of " +
              chapter +
              " of " +
              this.book
          ).then(async () => {
            this.summary = this.response.trim();
            const summaryRef = doc(db, "gpt4", this.book, "chapters", chapter);
            await updateDoc(summaryRef, {
              summary: this.summary,
            });
            this.displayFeed();

            for (let i = 0; i < this.chapters.length; i++) {
              if (this.chapters[i].title === chapter) {
                this.chapters[i].generating = false;
              }
            }
            //this.summary = this.response;

            let nextChapter;

            for (let i = 0; i < this.chapters.length; i++) {
              if (this.chapters[i].title === chapter) {
                if (i + 1 < this.chapters.length) {
                  nextChapter = this.chapters[i + 1];
                }
                break;
              }
            }

            if (nextChapter) {
              // Do something with the next chapter
              this.summaryChapterBG(nextChapter.title);
            } else {
              // No next chapter found
              console.log("no next chapter");
            }
          });
          this.completionCall(
            "Please format this where it is just quote then return, quote then return, etc. Give me the best quotes from " +
              chapter +
              " of " +
              this.book +
              "\nQuotes:\n"
          ).then(async () => {
            let temp = this.response.trim();
            this.quotes = temp.replace(/^\d+\. /gm, "");
            this.quotes.split("\n");
            const summaryRef = doc(db, "gpt4", this.book, "chapters", chapter);
            await updateDoc(summaryRef, {
              quotes: this.quotes,
            });
          });
          this.completionCall(
            "in simple, quick terms, provide the key takeaways of this chapter: " +
              chapter +
              "\nof this book: " +
              this.book +
              "\nTakeaways:\n"
          ).then(async () => {
            //set this.mainpoints to the response and split it into an array cutting at each \n
            let temp = this.response.replace(/^- /gm, "");
            temp = temp.trim();
            this.mainPoints = temp
              .split("\n")
              .map((point) => point.trim())
              .filter((point) => point !== "");
            const summaryRef = doc(db, "gpt4", this.book, "chapters", chapter);
            await updateDoc(summaryRef, {
              mainPoints: this.mainPoints,
            });
          });
        }
      });
    },

    async summaryChapterBG(chapter) {
      //this.prepareFeed();
      //chapter.summary = "hello";

      const chapterRef = doc(db, "gpt4", this.book, "chapters", chapter);
      const docSnap = await getDoc(chapterRef).then((docSnap) => {
        if (
          docSnap.data().summary &&
          docSnap.data().quotes &&
          docSnap.data().mainPoints
        ) {
          //console.log("Next chapter already generated");
          // this.summary = docSnap.data().summary;
          // this.quotes = docSnap.data().quotes;
          // this.mainPoints = docSnap.data().mainPoints;
          // this.caseStudies = docSnap.data().caseStudies;
          // this.displayFeed();
        } else {
          for (let i = 0; i < this.chapters.length; i++) {
            if (this.chapters[i].title === chapter) {
              this.chapters[i].generating = true;
            }
          }

          console.log("Generating next chapter");
          this.completionCall(
            "proivide a comprehensive, long summary of " +
              chapter +
              " of " +
              this.book
          ).then(async () => {
            let tempSummary = this.response.trim();
            const summaryRef = doc(db, "gpt4", this.book, "chapters", chapter);
            await updateDoc(summaryRef, {
              summary: tempSummary,
            });
            //this.displayFeed();
            //this.summary = this.response;
            for (let i = 0; i < this.chapters.length; i++) {
              if (this.chapters[i].title === chapter) {
                this.chapters[i].generating = false;
              }
            }
          });
          this.completionCall(
            "Please format this where it is just quote then return, quote then return, etc. Give me the best quotes from " +
              chapter +
              " of " +
              this.book +
              "\nQuotes:\n"
          ).then(async () => {
            let temp = this.response.trim();
            let tempQuotes = temp.replace(/^\d+\. /gm, "");
            tempQuotes.split("\n");
            const summaryRef = doc(db, "gpt4", this.book, "chapters", chapter);
            await updateDoc(summaryRef, {
              quotes: tempQuotes,
            });
          });
          this.completionCall(
            "in simple, quick terms, provide the key takeaways of this chapter: " +
              chapter +
              "\nof this book: " +
              this.book +
              "\nTakeaways:\n"
          ).then(async () => {
            //set this.mainpoints to the response and split it into an array cutting at each \n
            let temp = this.response.replace(/^- /gm, "");
            temp = temp.trim();
            let tempMainPoints = temp
              .split("\n")
              .map((point) => point.trim())
              .filter((point) => point !== "");
            const summaryRef = doc(db, "gpt4", this.book, "chapters", chapter);
            await updateDoc(summaryRef, {
              mainPoints: tempMainPoints,
            });
          });
        }
      });
    },

    async getGenSum() {
      this.prepareBtns();
      const ref = doc(db, "gpt4", this.book);
      const docSnap = await getDoc(ref).then((docSnap) => {
        if (docSnap.data().generalSummary) {
          this.generalSummary = docSnap.data().generalSummary;
          document.querySelector(".loadingGeneralDiv").style.display = "none";
          document.querySelector(".genSumDiv").style.display = "block";
        } else {
          this.completionCall(
            "Please provide a general summary of " + this.book + "\nSummary:\n"
          ).then(async () => {
            this.generalSummary = this.response.trim();
            const summaryRef = doc(db, "gpt4", this.book);
            await updateDoc(summaryRef, {
              generalSummary: this.generalSummary,
            });
            document.querySelector(".loadingGeneralDiv").style.display = "none";
            document.querySelector(".genSumDiv").style.display = "block";
          });
        }
      });
    },
    async getAuthor() {
      this.prepareBtns();
      const ref = doc(db, "gpt4", this.book);
      const docSnap = await getDoc(ref).then((docSnap) => {
        if (docSnap.data().author) {
          this.author = docSnap.data().author;
          document.querySelector(".loadingGeneralDiv").style.display = "none";
          document.querySelector(".authorDiv").style.display = "block";
        } else {
          this.completionCall(
            "Give background on the author of " + this.book + "\nbackground:\n"
          ).then(async () => {
            this.author = this.response.trim();
            const authorRef = doc(db, "gpt4", this.book);
            await updateDoc(authorRef, {
              author: this.author,
            });
            document.querySelector(".loadingGeneralDiv").style.display = "none";
            document.querySelector(".authorDiv").style.display = "block";
          });
        }
      });
    },
    async getRelated() {
      this.prepareBtns();
      const ref = doc(db, "gpt4", this.book);
      const docSnap = await getDoc(ref).then((docSnap) => {
        if (docSnap.data().related) {
          this.related = docSnap.data().related;
          document.querySelector(".loadingGeneralDiv").style.display = "none";
          document.querySelector(".relatedDiv").style.display = "block";
        } else {
          this.completionCall(
            "Give a list of related books based on this book: " +
              this.book +
              "\n"
          ).then(async () => {
            this.related = this.response.trim();
            const relatedRef = doc(db, "gpt4", this.book);
            await updateDoc(relatedRef, {
              related: this.related,
            });
            document.querySelector(".loadingGeneralDiv").style.display = "none";
            document.querySelector(".relatedDiv").style.display = "block";
          });
        }
      });
    },
    prepareBtns() {
      document.querySelector(".genSumDiv").style.display = "none";
      document.querySelector(".authorDiv").style.display = "none";
      document.querySelector(".relatedDiv").style.display = "none";
      document.querySelector(".loadingGeneralDiv").style.display = "block";
      document.querySelector(".closeBtn").style.display = "flex";
    },
    prepareFeed() {
      this.messages = []; //TODO: make sure this is a good changee
      // call the polyfill once in your application
      smoothscroll.polyfill();

      // then you can use scrollIntoView with smooth behavior
      var myElement = document.getElementsByClassName("feed")[1];
      myElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        scrollMargin: 100,
      });

      document.querySelectorAll(".feedContent").forEach(function (elem) {
        elem.style.display = "none";
      });
      // do this for the feedLoading as well
      document.querySelectorAll(".FeedLoading").forEach(function (elem) {
        elem.style.display = "block";
      });
      document.querySelectorAll(".audio-player").forEach(function (elem) {
        elem.style.display = "none";
      });
      if (this.audio && !this.audio.paused) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    },
    displayFeed() {
      document.querySelectorAll(".feedContent").forEach(function (elem) {
        elem.style.display = "block";
      });

      document.querySelectorAll(".FeedLoading").forEach(function (elem) {
        elem.style.display = "none";
      });
    },
    closeBtns() {
      document.querySelector(".genSumDiv").style.display = "none";
      document.querySelector(".authorDiv").style.display = "none";
      document.querySelector(".relatedDiv").style.display = "none";
      document.querySelector(".loadingGeneralDiv").style.display = "none";
      document.querySelector(".closeBtn").style.display = "none";
    },
    async chatResponse(chat) {
      this.chatMessages.push({ role: "user", content: chat });
      // Set loadingId to the index of the assistant message
      this.loadingId = this.chatMessages.length;
      this.chatMessages.push({ role: "assistant", content: "" });
      this.animateScroll();

      const apiKey = process.env.OPENAI_API_KEY || this.OPENAI_API_KEY;
      const apiEndpoint = "https://api.openai.com/v1/chat/completions"; // Update the endpoint according to the API version you're using

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const data = {
        model: "gpt-4", // USE THIS MODEL FOR NOW FOR FASTER RESPONSES
        messages: this.chatMessages,
      };

      try {
        const response = await axios.post(apiEndpoint, data, { headers });
        const completion = response.data;
        this.response = completion.choices[0].message.content;
        this.chatMessages[this.chatMessages.length - 1] = {
          role: "assistant",
          content: this.response,
        };
        console.log(this.response);
        this.animateScroll();
        this.chat = "";
      } catch (error) {
        console.error("API call failed:", error);
      }

      this.loadingId = null; // Reset loadingId after the response is received
    },

    async audioBook() {
      // stop any audio playing
      if (this.audio && !this.audio.paused) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }

      const audioLoadingAll = document.querySelectorAll(".audioLoading");

      audioLoadingAll.forEach((audioLoading) => {
        audioLoading.style.display = "block";
      });

      const chapterRef = collection(db, "gpt4", this.book, "chapters");

      // Create a query to fetch chapters with summary equal to this.summary
      const q = query(chapterRef, where("mainPoints", "==", this.mainPoints));

      // Execute the query and process the results
      getDocs(q)
        .then(async (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`Chapter ID: ${doc.id}`);
            this.currentChapter = doc.id;
          });

          if (await this.checkAudioFileExists()) {
            const storage = getStorage();
            const audioRef = refStorage(
              storage,
              `books/${this.book}/chapters/${this.currentChapter}/audio.mp3`
            );

            // Get the download URL of the existing audio file
            const audioURL = await getDownloadURL(audioRef);

            // Set this.audio to the existing file
            this.audio = new Audio(audioURL);
          } else {
            // const Polly = new AWS.Polly();
            //make a new variable of takeaways and make it a string of everything in this.mainPoints array
            const takeaways = this.mainPoints.join("\n");

            const text = `Summary: ${this.summary}\n\nKey Takeaways: ${takeaways}}\n\nQuotes: ${this.quotes}\n\nEnd of Chapter.`;
            const maxLength = 2800;
            const textParts = this.splitText(text, maxLength);

            const audioStreams = [];

            for (const part of textParts) {
              const params = {
                Text: part,
                OutputFormat: "mp3",
                VoiceId: "Stephen",
                Engine: "neural",
              };

              try {
                const data = await Polly.synthesizeSpeech(params).promise();
                audioStreams.push(data.AudioStream);
              } catch (err) {
                console.log(err);
                return;
              }
            }

            const audioSrc = URL.createObjectURL(
              new Blob(audioStreams, { type: "audio/mpeg" })
            );
            this.audio = new Audio(audioSrc);

            const storage = getStorage();

            // Convert this.audio to a Blob
            this.audio.pause();
            const response = await fetch(this.audio.src);
            const audioBlob = await response.blob();

            // Create a storage reference using refStorage
            const audioRef = refStorage(
              storage,
              `books/${this.book}/chapters/${this.currentChapter}/audio.mp3`
            );

            // Upload the audio file to Firebase Storage
            await uploadBytes(audioRef, audioBlob);
          }

          //increase the speed of the audio
          //this.audio.playbackRate = 1.1;

          const progressBarAll = document.querySelectorAll(".progress-bar");
          const progressFillAll = document.querySelectorAll(".progress-fill");
          const seekHandleAll = document.querySelectorAll(".seek-handle");
          const timestampAll = document.querySelectorAll(".time-stamp");
          const timestampEndAll = document.querySelectorAll(".time-stamp-end");

          progressBarAll.forEach((progressBar, index) => {
            const progressFill = progressFillAll[index];
            const seekHandle = seekHandleAll[index];
            const timestamp = timestampAll[index];
            const timestampEnd = timestampEndAll[index];

            progressBar.style.width = "100%";

            this.audio.addEventListener("timeupdate", () => {
              const currentTime = formatTime(this.audio.currentTime);
              const duration = formatTime(this.audio.duration);
              const progressPercent =
                (this.audio.currentTime / this.audio.duration) * 100;
              progressFill.style.width = `${progressPercent + 1}%`;
              seekHandle.style.left = `${progressPercent}%`;
              timestamp.textContent = `${currentTime}`;
              timestampEnd.textContent = `${duration}`;
            });

            let isSeeking = false;
            seekHandle.addEventListener("mousedown", () => {
              isSeeking = true;
            });
            document.addEventListener("mouseup", () => {
              if (isSeeking) {
                isSeeking = false;
                const barWidth = progressBar.offsetWidth;
                const seekPosition =
                  seekHandle.offsetLeft + seekHandle.offsetWidth / 2;
                const seekTime =
                  (seekPosition / barWidth) * this.audio.duration;
                this.audio.currentTime = seekTime;
              }
            });
            document.addEventListener("mousemove", (event) => {
              if (isSeeking) {
                const barWidth = progressBar.offsetWidth;
                let seekPosition =
                  event.clientX - progressBar.getBoundingClientRect().left;
                seekPosition = Math.max(seekPosition, 0);
                seekPosition = Math.min(seekPosition, barWidth);
                seekHandle.style.left = `${seekPosition}px`;
                const seekTime =
                  (seekPosition / barWidth) * this.audio.duration;
                this.audio.currentTime = seekTime;
                timestamp.textContent = `${formatTime(seekTime)}`;
              }
            });
          });

          const audioLoadingAll = document.querySelectorAll(".audioLoading");
          const audioPlayerAll = document.querySelectorAll(".audio-player");

          audioLoadingAll.forEach((audioLoading) => {
            audioLoading.style.display = "none";
          });

          audioPlayerAll.forEach((audioPlayer) => {
            audioPlayer.style.display = "flex";
          });
          this.audio.play();

          function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`;
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    splitText(text, maxLength = 2800) {
      const parts = [];
      let currentPart = "";

      const words = text.split(" ");

      for (const word of words) {
        if ((currentPart + word).length > maxLength) {
          parts.push(currentPart);
          currentPart = "";
        }
        currentPart += `${word} `;
      }

      if (currentPart.length > 0) {
        parts.push(currentPart);
      }

      return parts;
    },

    playAudio() {
      const audioElement = this.$refs.audioElement;

      if (this.audio.paused) {
        this.audio.play();
        this.iconName = "pause";
      } else {
        this.audio.pause();
        this.iconName = "play_arrow";
      }
    },
    async checkAudioFileExists() {
      console.log(this.currentChapter);
      const storage = getStorage();
      const audioRef = refStorage(
        storage,
        `books/${this.book}/chapters/${this.currentChapter}/audio.mp3`
      );

      try {
        // Get the download URL of the existing audio file
        const audioURL = await getDownloadURL(audioRef);

        // Set this.audio to the existing file
        return true;
      } catch (error) {
        // If there's an error, the file doesn't exist (assuming the error is due to the file not being found)
        if (error.code === "storage/object-not-found") {
          console.log("The audio file does not exist.");
        } else {
          // Handle other errors
          console.log("Error checking for the audio file:", error);
        }
        return false;
      }
    },
  },
};
</script>
<style>
.center {
  margin: 0 auto;
}
.chapterCard {
  max-width: 500px;
  margin: 20px;
}
.chapter {
  font-size: 18px;
  line-height: 1.5;
  padding-left: 10px;
}
.quotes {
  white-space: pre-line;
  font-size: 18px;
  line-height: 1.5;
  border-left: 4px solid #333;
  padding-left: 10px;
  margin-bottom: 20px;
}
.summary {
  font-size: 18px;
  line-height: 1.5;
  padding-left: 10px;
  margin-bottom: 20px;
  white-space: pre-line;
}
.pointCard {
}
.point {
  font-size: 18px;
  line-height: 1.5;
  padding-left: 10px;
}
.hide {
  display: none;
}
.closeBtn {
  display: none;
}

.audio-player {
  display: none;
  align-items: center;
  width: 100%;
}

.audio-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
}

.progress-bar {
  position: relative;
  flex-grow: 1;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin: 0 1rem;
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #008cba;
  border-radius: 5px;
}

.seek-handle {
  position: absolute;
  top: -5px;
  left: 0;
  width: 15px;
  height: calc(100% + 10px);
  /* background-color: #fff; */
  border: 2px solid #008cba;
  border-radius: 10px;
  cursor: pointer;
}

.seek-handle:hover {
  background-color: #008cba;
  border-color: #fff;
}

.time-stamp,
.time-stamp-end {
  font-size: 0.8rem;
}
.audioLoading {
  display: none;
}
</style>
