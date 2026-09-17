
<template>

    <!-- ========================================================= -->
    <!-- MODAL -->
    <!-- ========================================================= -->

    <Transition
        appear
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >

        <div
            class="fixed inset-0 z-50
                   flex items-center justify-center
                   p-4"
            @click.self="close"
        >

            <!-- Backdrop -->
            <div
                class="absolute inset-0
                       bg-slate-950/50
                       backdrop-blur-sm"
            ></div>


            <!-- ================================================= -->
            <!-- MODAL -->
            <!-- ================================================= -->

            <Transition
                appear
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 scale-95 translate-y-3"
                enter-to-class="opacity-100 scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 scale-100 translate-y-0"
                leave-to-class="opacity-0 scale-95 translate-y-3"
            >

                <div
                    class="relative
                           w-full
                           max-w-5xl
                           max-h-[90vh]
                           flex flex-col
                           bg-white
                           rounded-2xl
                           shadow-2xl
                           border border-slate-200
                           overflow-hidden"
                    @click.stop
                >

                    <!-- ========================================= -->
                    <!-- HEADER -->
                    <!-- ========================================= -->

                    <div
                        class="flex items-center justify-between
                               px-6 py-5
                               border-b border-slate-200
                               shrink-0"
                    >

                        <div class="flex items-center gap-3">

                            <!-- Icon -->
                            <div
                                class="w-10 h-10
                                       rounded-xl
                                       bg-blue-50
                                       text-blue-600
                                       flex items-center
                                       justify-center
                                       shrink-0"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213 3 20.5l1.287-4.5L16.862 3.487z"
                                    />
                                </svg>

                            </div>


                            <div>

                                <h2
                                    class="text-lg
                                           font-semibold
                                           text-slate-900"
                                >
                                    Edit Product
                                </h2>

                                <p
                                    class="text-sm
                                           text-slate-500
                                           mt-0.5"
                                >
                                    Update product information and images
                                </p>

                            </div>

                        </div>


                        <!-- Close -->
                        <button
                            type="button"
                            @click="close"
                            :disabled="loading || uploadingImage"
                            class="w-9 h-9
                                   flex items-center
                                   justify-center
                                   rounded-lg
                                   text-slate-400
                                   hover:bg-slate-100
                                   hover:text-slate-700
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-40
                                   disabled:cursor-not-allowed"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                        </button>

                    </div>


                    <!-- ========================================= -->
                    <!-- FORM CONTENT -->
                    <!-- ========================================= -->

                    <form
                        @submit.prevent="submit"
                        class="flex-1 overflow-y-auto"
                    >

                        <div class="px-6 py-6">


                            <!-- General Error -->

                            <div
                                v-if="generalError"
                                class="flex items-start gap-3
                                       mb-6
                                       p-3.5
                                       rounded-xl
                                       bg-red-50
                                       border border-red-200
                                       text-red-700"
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5
                                           mt-0.5
                                           shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 9v3.75m0 3.75h.008M10.29 3.86l-7.82 13.5A1.5 1.5 0 003.77 19.5h16.46a1.5 1.5 0 001.3-2.14l-7.82-13.5a1.5 1.5 0 00-2.6 0z"
                                    />
                                </svg>

                                <p class="text-sm">
                                    {{ generalError }}
                                </p>

                            </div>


                            <!-- ===================================== -->
                            <!-- MAIN GRID -->
                            <!-- ===================================== -->

                            <div
                                class="grid grid-cols-1
                                       lg:grid-cols-2
                                       gap-8"
                            >


                                <!-- ================================= -->
                                <!-- PRODUCT INFORMATION -->
                                <!-- ================================= -->

                                <div>

                                    <!-- Section Header -->
                                    <div class="mb-5">

                                        <div
                                            class="flex items-center gap-2"
                                        >

                                            <div
                                                class="w-8 h-8
                                                       rounded-lg
                                                       bg-slate-100
                                                       text-slate-600
                                                       flex items-center
                                                       justify-center"
                                            >

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    class="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                                    />
                                                </svg>

                                            </div>

                                            <h3
                                                class="font-semibold
                                                       text-slate-900"
                                            >
                                                Product Information
                                            </h3>

                                        </div>

                                        <p
                                            class="text-sm
                                                   text-slate-500
                                                   mt-1"
                                        >
                                            Update the basic product information.
                                        </p>

                                    </div>


                                    <!-- Product Name -->
                                    <div class="mb-5">

                                        <label
                                            class="block
                                                   text-sm
                                                   font-medium
                                                   text-slate-700
                                                   mb-1.5"
                                        >
                                            Product Name
                                        </label>

                                        <input
                                            v-model="form.name"
                                            type="text"
                                            placeholder="Enter product name"
                                            :class="[
                                                'w-full px-4 py-2.5',
                                                'border rounded-xl',
                                                'text-sm text-slate-900',
                                                'placeholder:text-slate-400',
                                                'outline-none transition',
                                                errors.name
                                                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                            ]"
                                        >

                                        <p
                                            v-if="errors.name"
                                            class="mt-1.5
                                                   text-xs
                                                   text-red-600"
                                        >
                                            {{ errors.name }}
                                        </p>

                                    </div>


                                    <!-- Category -->
                                    <div class="mb-5">

                                        <label
                                            class="block
                                                   text-sm
                                                   font-medium
                                                   text-slate-700
                                                   mb-1.5"
                                        >
                                            Category
                                        </label>

                                        <select
                                            v-model="form.category_id"
                                            :class="[
                                                'w-full px-4 py-2.5',
                                                'border rounded-xl',
                                                'text-sm bg-white',
                                                'outline-none transition',
                                                'cursor-pointer',
                                                errors.category_id
                                                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                            ]"
                                        >

                                            <option value="">
                                                Select category
                                            </option>

                                            <option
                                                v-for="category in categories"
                                                :key="category.id"
                                                :value="category.id"
                                            >
                                                {{ category.name }}
                                            </option>

                                        </select>

                                        <p
                                            v-if="errors.category_id"
                                            class="mt-1.5
                                                   text-xs
                                                   text-red-600"
                                        >
                                            {{ errors.category_id }}
                                        </p>

                                    </div>


                                    <!-- Price + Quantity -->
                                    <div
                                        class="grid grid-cols-1
                                               sm:grid-cols-2
                                               gap-4
                                               mb-5"
                                    >

                                        <!-- Price -->
                                        <div>

                                            <label
                                                class="block
                                                       text-sm
                                                       font-medium
                                                       text-slate-700
                                                       mb-1.5"
                                            >
                                                Price
                                            </label>

                                            <div class="relative">

                                                <span
                                                    class="absolute
                                                           left-3.5
                                                           top-1/2
                                                           -translate-y-1/2
                                                           text-sm
                                                           text-slate-400"
                                                >
                                                    $
                                                </span>

                                                <input
                                                    v-model="form.price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    placeholder="0.00"
                                                    :class="[
                                                        'w-full pl-8 pr-4 py-2.5',
                                                        'border rounded-xl',
                                                        'text-sm',
                                                        'outline-none transition',
                                                        errors.price
                                                            ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                                            : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                    ]"
                                                >

                                            </div>

                                            <p
                                                v-if="errors.price"
                                                class="mt-1.5
                                                       text-xs
                                                       text-red-600"
                                            >
                                                {{ errors.price }}
                                            </p>

                                        </div>


                                        <!-- Quantity -->
                                        <div>

                                            <label
                                                class="block
                                                       text-sm
                                                       font-medium
                                                       text-slate-700
                                                       mb-1.5"
                                            >
                                                Quantity
                                            </label>

                                            <input
                                                v-model="form.quantity"
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                :class="[
                                                    'w-full px-4 py-2.5',
                                                    'border rounded-xl',
                                                    'text-sm',
                                                    'outline-none transition',
                                                    errors.quantity
                                                        ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                                        : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                                ]"
                                            >

                                            <p
                                                v-if="errors.quantity"
                                                class="mt-1.5
                                                       text-xs
                                                       text-red-600"
                                            >
                                                {{ errors.quantity }}
                                            </p>

                                        </div>

                                    </div>


                                    <!-- Description -->
                                    <div>

                                        <div
                                            class="flex items-center
                                                   justify-between
                                                   mb-1.5"
                                        >

                                            <label
                                                class="block
                                                       text-sm
                                                       font-medium
                                                       text-slate-700"
                                            >
                                                Description
                                            </label>

                                            <span
                                                class="text-xs
                                                       text-slate-400"
                                            >
                                                Optional
                                            </span>

                                        </div>

                                        <textarea
                                            v-model="form.description"
                                            rows="8"
                                            placeholder="Describe the product..."
                                            :class="[
                                                'w-full px-4 py-3',
                                                'border rounded-xl',
                                                'text-sm',
                                                'placeholder:text-slate-400',
                                                'resize-none',
                                                'outline-none transition',
                                                errors.description
                                                    ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                                                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                            ]"
                                        ></textarea>

                                        <p
                                            v-if="errors.description"
                                            class="mt-1.5
                                                   text-xs
                                                   text-red-600"
                                        >
                                            {{ errors.description }}
                                        </p>

                                    </div>

                                </div>


                                <!-- ================================= -->
                                <!-- PRODUCT IMAGES -->
                                <!-- ================================= -->

                                <div>

                                    <!-- Section Header -->
                                    <div
                                        class="flex items-start
                                               justify-between
                                               gap-4
                                               mb-5"
                                    >

                                        <div>

                                            <div
                                                class="flex items-center gap-2"
                                            >

                                                <div
                                                    class="w-8 h-8
                                                           rounded-lg
                                                           bg-blue-50
                                                           text-blue-600
                                                           flex items-center
                                                           justify-center"
                                                >

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    >
                                                        <rect
                                                            x="3"
                                                            y="3"
                                                            width="18"
                                                            height="18"
                                                            rx="2"
                                                            ry="2"
                                                        />

                                                        <circle
                                                            cx="8.5"
                                                            cy="8.5"
                                                            r="1.5"
                                                        />

                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M21 15l-5-5L5 21"
                                                        />
                                                    </svg>

                                                </div>

                                                <h3
                                                    class="font-semibold
                                                           text-slate-900"
                                                >
                                                    Product Images
                                                </h3>

                                            </div>

                                            <p
                                                class="text-sm
                                                       text-slate-500
                                                       mt-1"
                                            >
                                                Upload and manage product images.
                                            </p>

                                        </div>


                                        <!-- Upload -->
                                        <label
                                            class="inline-flex
                                                   items-center
                                                   gap-2
                                                   px-3.5 py-2.5
                                                   rounded-xl
                                                   bg-slate-900
                                                   text-white
                                                   text-sm
                                                   font-medium
                                                   hover:bg-slate-800
                                                   transition-colors
                                                   cursor-pointer
                                                   shrink-0
                                                   disabled:opacity-50"
                                        >

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-4 h-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                                />
                                            </svg>

                                            {{
                                                uploadingImage
                                                    ? 'Uploading...'
                                                    : 'Add Image'
                                            }}

                                            <input
                                                type="file"
                                                accept="image/*"
                                                class="hidden"
                                                :disabled="uploadingImage"
                                                @change="uploadImage"
                                            >

                                        </label>

                                    </div>


                                    <!-- Image Error -->

                                    <div
                                        v-if="imageError"
                                        class="flex items-start gap-2
                                               mb-4
                                               p-3
                                               rounded-xl
                                               bg-red-50
                                               border border-red-200
                                               text-red-700"
                                    >

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="w-4 h-4
                                                   mt-0.5
                                                   shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 9v3.75m0 3.75h.008M10.29 3.86l-7.82 13.5A1.5 1.5 0 003.77 19.5h16.46a1.5 1.5 0 001.3-2.14l-7.82-13.5a1.5 1.5 0 00-2.6 0z"
                                            />
                                        </svg>

                                        <p class="text-sm">
                                            {{ imageError }}
                                        </p>

                                    </div>


                                    <!-- ================================= -->
                                    <!-- IMAGES -->
                                    <!-- ================================= -->

                                    <div
                                        v-if="images.length"
                                        class="grid grid-cols-2
                                               gap-4"
                                    >

                                        <div
                                            v-for="image in images"
                                            :key="image.id"
                                            class="group
                                                   overflow-hidden
                                                   rounded-xl
                                                   border
                                                   border-slate-200
                                                   bg-white
                                                   shadow-sm
                                                   hover:shadow-md
                                                   transition-shadow"
                                        >

                                            <!-- Image -->
                                            <div
                                                class="relative
                                                       bg-slate-100"
                                            >

                                                <img
                                                    :src="image.url"
                                                    class="w-full
                                                           h-40
                                                           object-cover"
                                                    :alt="form.name"
                                                >


                                                <!-- Primary -->
                                                <span
                                                    v-if="image.is_primary === 1"
                                                    class="absolute
                                                           top-2 left-2
                                                           inline-flex
                                                           items-center
                                                           gap-1
                                                           px-2 py-1
                                                           rounded-lg
                                                           bg-green-600
                                                           text-white
                                                           text-xs
                                                           font-medium
                                                           shadow-sm"
                                                >

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-3 h-3"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z"
                                                        />
                                                    </svg>

                                                    Primary

                                                </span>

                                            </div>


                                            <!-- Actions -->
                                            <div
                                                class="flex items-center
                                                       justify-between
                                                       gap-2
                                                       p-3"
                                            >

                                                <!-- Primary -->
                                                <button
                                                    v-if="image.is_primary !== 1"
                                                    type="button"
                                                    @click="setPrimaryImage(image)"
                                                    class="inline-flex
                                                           items-center
                                                           gap-1
                                                           text-xs
                                                           font-medium
                                                           text-blue-600
                                                           hover:text-blue-800
                                                           cursor-pointer
                                                           transition-colors"
                                                >

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-3.5 h-3.5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L6.98 6.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"
                                                        />
                                                    </svg>

                                                    Set primary

                                                </button>

                                                <span
                                                    v-else
                                                    class="text-xs
                                                           font-medium
                                                           text-green-600"
                                                >
                                                    Primary image
                                                </span>


                                                <!-- Delete -->
                                                <button
                                                    type="button"
                                                    @click="deleteImage(image)"
                                                    class="inline-flex
                                                           items-center
                                                           gap-1
                                                           text-xs
                                                           font-medium
                                                           text-red-600
                                                           hover:text-red-800
                                                           cursor-pointer
                                                           transition-colors"
                                                >

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="w-3.5 h-3.5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a1 1 0 01-1 1H8a1 1 0 01-1-1V7m3 4v5m4-5v5"
                                                        />
                                                    </svg>

                                                    Delete

                                                </button>

                                            </div>

                                        </div>

                                    </div>


                                    <!-- ================================= -->
                                    <!-- EMPTY -->
                                    <!-- ================================= -->

                                    <div
                                        v-else
                                        class="min-h-[360px]
                                               flex flex-col
                                               items-center
                                               justify-center
                                               text-center
                                               p-6
                                               rounded-2xl
                                               border-2
                                               border-dashed
                                               border-slate-200
                                               bg-slate-50/50"
                                    >

                                        <div
                                            class="w-14 h-14
                                                   rounded-xl
                                                   bg-white
                                                   border border-slate-200
                                                   text-slate-400
                                                   flex items-center
                                                   justify-center
                                                   mb-4"
                                        >

                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="w-6 h-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                stroke-width="1.8"
                                            >
                                                <rect
                                                    x="3"
                                                    y="3"
                                                    width="18"
                                                    height="18"
                                                    rx="2"
                                                    ry="2"
                                                />

                                                <circle
                                                    cx="8.5"
                                                    cy="8.5"
                                                    r="1.5"
                                                />

                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M21 15l-5-5L5 21"
                                                />
                                            </svg>

                                        </div>

                                        <p
                                            class="font-medium
                                                   text-slate-600"
                                        >
                                            No images
                                        </p>

                                        <p
                                            class="text-sm
                                                   text-slate-400
                                                   mt-1
                                                   max-w-xs"
                                        >
                                            Add an image using the button above.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>


                    <!-- ========================================= -->
                    <!-- FOOTER -->
                    <!-- ========================================= -->

                    <div
                        class="flex justify-end
                               gap-3
                               px-6 py-4
                               border-t border-slate-200
                               bg-slate-50/50
                               shrink-0"
                    >

                        <button
                            type="button"
                            @click="close"
                            :disabled="loading || uploadingImage"
                            class="px-4 py-2.5
                                   rounded-xl
                                   border border-slate-300
                                   bg-white
                                   text-slate-700
                                   text-sm
                                   font-medium
                                   hover:bg-slate-50
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>


                        <button
                            type="button"
                            @click="submit"
                            :disabled="loading || uploadingImage"
                            class="inline-flex
                                   items-center
                                   justify-center
                                   gap-2
                                   min-w-[145px]
                                   px-4 py-2.5
                                   rounded-xl
                                   bg-slate-900
                                   text-white
                                   text-sm
                                   font-medium
                                   hover:bg-slate-800
                                   transition-colors
                                   cursor-pointer
                                   disabled:opacity-50
                                   disabled:cursor-not-allowed"
                        >

                            <svg
                                v-if="loading"
                                class="w-4 h-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                />

                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>

                            {{
                                loading
                                    ? 'Updating...'
                                    : 'Update Product'
                            }}

                        </button>

                    </div>

                </div>

            </Transition>

        </div>

    </Transition>

</template>


<script setup>

import {
    onMounted,
    onUnmounted,
    reactive,
    ref
} from 'vue'

import api from '../../services/api'


/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
*/

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})


/*
|--------------------------------------------------------------------------
| Emits
|--------------------------------------------------------------------------
*/

const emit = defineEmits([
    'close',
    'updated'
])


/*
|--------------------------------------------------------------------------
| State
|--------------------------------------------------------------------------
*/

const categories = ref([])

const images = ref([])

const loading = ref(false)

const uploadingImage = ref(false)

const generalError = ref('')

const imageError = ref('')


/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

const form = reactive({
    name: '',
    category_id: '',
    price: '',
    description: '',
    quantity: ''
})


/*
|--------------------------------------------------------------------------
| Validation Errors
|--------------------------------------------------------------------------
*/

const errors = reactive({
    name: '',
    category_id: '',
    price: '',
    description: '',
    quantity: ''
})


/*
|--------------------------------------------------------------------------
| Get Categories
|--------------------------------------------------------------------------
*/

const getCategories = async () => {

    try {

        const response =
            await api.get('/category')

        categories.value =
            response.data.data

    }

    catch (error) {

        console.error(error)

        generalError.value =
            'Failed to load categories'

    }

}


/*
|--------------------------------------------------------------------------
| Load Product
|--------------------------------------------------------------------------
*/

const loadProduct = async () => {

    try {

        const response =
            await api.get(
                `/product/${props.product.id}`
            )

        const product =
            response.data.data


        form.name =
            product.name

        form.category_id =
            product.category?.id || ''

        form.price =
            product.price

        form.description =
            product.description || ''

        form.quantity =
            product.quantity ?? ''


        images.value =
            product.images || []

    }

    catch (error) {

        console.error(error)

        generalError.value =
            error.response?.data?.message ||
            'Failed to load product'

    }

}


/*
|--------------------------------------------------------------------------
| Clear Errors
|--------------------------------------------------------------------------
*/

const clearErrors = () => {

    errors.name = ''

    errors.category_id = ''

    errors.price = ''

    errors.description = ''

    errors.quantity = ''

    generalError.value = ''

}


/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

const submit = async () => {

    clearErrors()

    try {

        loading.value = true


        await api.patch(
            `/product/${props.product.id}`,
            {
                name: form.name,

                category_id:
                    Number(form.category_id),

                price:
                    Number(form.price),

                description:
                    form.description || null,

                quantity:
                    form.quantity === ''
                        ? null
                        : Number(form.quantity)
            }
        )


        emit('updated')

        emit('close')

    }

    catch (error) {

        console.error(error)


        if (
            error.response?.status === 422
        ) {

            const validationErrors =
                error.response.data.errors || {}


            errors.name =
                validationErrors.name?.[0] || ''


            errors.category_id =
                validationErrors.category_id?.[0] || ''


            errors.price =
                validationErrors.price?.[0] || ''


            errors.description =
                validationErrors.description?.[0] || ''


            errors.quantity =
                validationErrors.quantity?.[0] || ''

        }

        else {

            generalError.value =
                error.response?.data?.message ||
                'Failed to update product'

        }

    }

    finally {

        loading.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Upload Image
|--------------------------------------------------------------------------
*/

const uploadImage = async (event) => {

    const file =
        event.target.files[0]


    if (!file) {

        return

    }


    imageError.value = ''


    try {

        uploadingImage.value = true


        const formData =
            new FormData()


        formData.append(
            'image',
            file
        )


        const response =
            await api.post(
                `/products/${props.product.id}/images`,
                formData,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type':
                            'multipart/form-data'
                    }
                }
            )


        images.value.push(
            response.data.data
        )


        event.target.value = ''

    }

    catch (error) {

        console.error(error)

        imageError.value =
            error.response?.data?.errors?.image?.[0] ||
            error.response?.data?.message ||
            'Failed to upload image'

    }

    finally {

        uploadingImage.value = false

    }

}


/*
|--------------------------------------------------------------------------
| Delete Image
|--------------------------------------------------------------------------
*/

const deleteImage = async (image) => {

    if (
        !confirm(
            'Delete this image?'
        )
    ) {

        return

    }


    imageError.value = ''


    try {

        await api.delete(
            `/products/${props.product.id}/${image.id}`
        )


        images.value =
            images.value.filter(
                item => item.id !== image.id
            )

    }

    catch (error) {

        console.error(error)

        imageError.value =
            error.response?.data?.message ||
            'Failed to delete image'

    }

}


/*
|--------------------------------------------------------------------------
| Close
|--------------------------------------------------------------------------
*/

const close = () => {

    if (
        loading.value ||
        uploadingImage.value
    ) {

        return

    }

    emit('close')

}


/*
|--------------------------------------------------------------------------
| Escape
|--------------------------------------------------------------------------
*/

const handleEscape = (event) => {

    if (event.key === 'Escape') {

        close()

    }

}


/*
|--------------------------------------------------------------------------
| Mounted
|--------------------------------------------------------------------------
*/

onMounted(async () => {

    await getCategories()

    await loadProduct()


    window.addEventListener(
        'keydown',
        handleEscape
    )

})


/*
|--------------------------------------------------------------------------
| Unmounted
|--------------------------------------------------------------------------
*/

onUnmounted(() => {

    window.removeEventListener(
        'keydown',
        handleEscape
    )

})

</script>

