import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useNotes } from '@/context/NotesContext'
import { useRouter } from 'expo-router'

const AddNotes = () => {
  const { addNote } = useNotes()
  const router = useRouter();

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    if (title.trim() && content.trim()) {
      await addNote({ title: title.trim(), content: content.trim() })
      router.back();
      setTitle('')
      setContent('')
    }
  }

  return (
    <View className='flex-1 bg-gray-50 p-4'>
      <View className='bg-white rounded-lg shadow-sm p-5'>
        <View className='mb-4'>
          <Text className='text-sm font-medium text-gray-700 mb-2'>Title</Text>
          <TextInput
            className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base text-gray-800'
            placeholder='Enter note title'
            placeholderTextColor='#9CA3AF'
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View className='mb-6'>
          <Text className='text-sm font-medium text-gray-700 mb-2'>
            Content
          </Text>
          <TextInput
            className='bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base text-gray-800'
            placeholder='Write your note here...'
            placeholderTextColor='#9CA3AF'
            value={content}
            onChangeText={setContent}
            multiline
            numberOfLines={8}
            textAlignVertical='top'
          />
        </View>

        <TouchableOpacity
          className='bg-blue-500 rounded-lg py-3 items-center shadow-sm'
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text className='text-white text-base font-semibold'>Save Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddNotes
