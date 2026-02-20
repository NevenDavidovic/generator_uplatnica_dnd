<template>
  <div>
    <!-- Mobile Sidebar -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    src="../assets/images/logo.png"
                    alt="JoJo"
                    class="w-[50px]"
                  />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a
                            href="#"
                            @click.prevent="navigate(item.name)"
                            :class="[
                              item.current
                                ? 'bg-primary text-white'
                                : 'text-indigo-200 hover:bg-[#b3e5fc] hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                            ]"
                          >
                            <component
                              :is="item.icon"
                              :class="[
                                item.current
                                  ? 'text-white'
                                  : 'text-indigo-200 group-hover:text-white',
                                'size-6 shrink-0',
                              ]"
                              aria-hidden="true"
                            />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li class="mt-auto">
                      <a
                        href="#"
                        @click.prevent="navigate('Postavke')"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-[#b3e5fc] hover:text-white"
                      >
                        <Cog6ToothIcon
                          class="size-6 shrink-0 text-indigo-200 group-hover:text-white"
                          aria-hidden="true"
                        />
                        Postavke
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Desktop Sidebar -->
    <div
      class="no-print hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4"
      >
        <div class="flex h-16 shrink-0 items-center">
          <img
            src="https://dnd-porec.hr/wp-content/uploads/2019/01/DND_logo_2019_191x196.png"
            alt="JoJo"
            class="w-[50px]"
          />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a
                    href="#"
                    @click.prevent="navigate(item.name)"
                    :class="[
                      item.current
                        ? 'hover:bg-[#b3e5fc] text-white'
                        : 'text-indigo-200 hover:bg-[#b3e5fc] hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                    ]"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-white'
                          : 'text-indigo-200 group-hover:text-white',
                        'size-6 shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>

            <li class="mt-auto">
              <a
                href="#"
                @click.prevent="navigate('Postavke')"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-indigo-200 hover:bg-indigo-700 hover:text-white"
              >
                <Cog6ToothIcon
                  class="size-6 shrink-0 text-indigo-200 group-hover:text-white"
                  aria-hidden="true"
                />
                Postavke
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="no-print -m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div class="no-print flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form
            class="no-print grid flex-1 grid-cols-1"
            action="#"
            method="GET"
          ></form>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Pogledaj obavijesti</span>
            </button>

            <div
              class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />

            <!-- User Profile Dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 no-print flex items-center p-1.5">
                <span class="sr-only">Otvori izbornik</span>
                <img
                  class="size-8 rounded-full bg-gray-50"
                  src="https://dnd-porec.hr/wp-content/uploads/2019/01/DND_logo_2019_191x196.png"
                  alt=""
                />
                <span class="hidden lg:flex lg:items-center">
                  <span
                    class="ml-4 text-sm/6 font-semibold text-gray-900"
                    aria-hidden="true"
                    >{{ accountName }}</span
                  >
                  <ChevronDownIcon
                    class="ml-2 size-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      href="#"
                      @click.prevent="navigate(item.name)"
                      :class="[
                        active ? 'bg-gray-50 outline-none' : '',
                        'block px-3 py-1 text-sm/6 text-gray-900',
                      ]"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Render the selected component dynamically -->
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <component :is="currentComponent" @navigate="navigate" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import ContactsComponent from "@/components/ContactsComponent.vue";
import SettingsComponent from "@/components/SettingsComponent.vue";
import SinglePayment from "@/components/SinglePayment.vue";
import OrganizationComponent from "@/components/OrganizationComponent.vue";
import StatisticsComponent from "@/components/StatisticsComponent.vue";
import DashboardComponent from "@/components/DashboardComponent.vue";
import RadioniceComponent from "@/components/RadioniceComponent.vue";
import AllSlips from "@/components/AllSlips.vue";
import QRGenerator from "@/components/QRGenerator.vue";
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";
import { usePaymentSlipStore } from "@/store/paymentSlipStore";

import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  QrCodeIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

export default {
  name: "DashboardView",
  setup() {
    const comp = ref(ContactsComponent);
    return { comp };
  },
  components: {
    ContactsComponent,
    SettingsComponent,
    StatisticsComponent,
    SinglePayment,
    AllSlips,
    OrganizationComponent,
    DashboardComponent,
    RadioniceComponent,
    QRGenerator,
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    Bars3Icon,
    BellIcon,
    CalendarIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
    QrCodeIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
  },
  data() {
    return {
      sidebarOpen: false,
      currentComponent: DashboardComponent,
      navigation: [
        { name: "Nadzorna ploča", href: "#", icon: HomeIcon, current: true },
        { name: "Kontakti", href: "#", icon: UsersIcon, current: false },
        {
          name: "Generator Uplatnice",
          href: "#",
          icon: FolderIcon,
          current: false,
        },
        {
          name: "Radionice",
          href: "#",
          icon: DocumentDuplicateIcon,
          current: false,
        },
        {
          name: "Generator QR Koda",
          href: "#",
          icon: QrCodeIcon,
          current: false,
        },
        { name: "Izvještaji", href: "#", icon: ChartPieIcon, current: false },
      ],
      userNavigation: [
        { name: "Profil", href: "#" },
        { name: "Odjava", href: "#" },
      ],
    };
  },
  computed: {
    accountName() {
      const authStore = useAuthStore();
      return authStore.user ? authStore.user.email : "Guest";
    },
  },
  methods: {
    navigate(itemName, contact = null) {
      // Reset all current flags
      this.navigation.forEach((item) => (item.current = false));

      switch (itemName) {
        case "Odjava": {
          const authStore = useAuthStore();
          authStore.signOut();
          this.$router.push("/signin");
          return;
        }
        case "Izvještaji": {
          this.currentComponent = StatisticsComponent;
          break;
        }
        case "Nadzorna ploča": {
          this.currentComponent = DashboardComponent;
          break;
        }
        case "Kontakti": {
          this.currentComponent = ContactsComponent;
          break;
        }
        case "Radionice": {
          this.currentComponent = RadioniceComponent;
          break;
        }
        case "Generator QR Koda": {
          this.currentComponent = QRGenerator;
          break;
        }
        case "Generator Uplatnice": {
          if (contact) {
            const slipStore = usePaymentSlipStore();
            slipStore.setSelectedContact(contact);
          }
          this.currentComponent = SinglePayment;
          break;
        }
        case "Postavke":
        case "Settings":
          this.currentComponent = SettingsComponent;
          break;
        case "Profil":
          this.currentComponent = OrganizationComponent;
          break;
        default:
          break;
      }

      // Set current flag for active nav item
      const activeItem = this.navigation.find((item) => item.name === itemName);
      if (activeItem) activeItem.current = true;

      this.sidebarOpen = false;
    },
  },
};
</script>