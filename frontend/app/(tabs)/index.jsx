import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Note from '@/components/Note.jsx'
import { useNotes } from '@/context/NotesContext'

const index = () => {
  const { notes } = useNotes()
  return (
    <View className='text-center '>
      <ScrollView className='w-full p-3 mb-3'>
        {notes &&
          notes.map(note => (
            <View key={note._id}>
              <Note note={note} />
            </View>
          ))}
      </ScrollView>
    </View>
  )
}

export default index
