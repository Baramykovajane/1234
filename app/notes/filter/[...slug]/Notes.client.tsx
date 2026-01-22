'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from "next/link";
import { getNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from '@/styles/NotesPage.module.css';

const PER_PAGE = 12;

type Props = { tag?: string };

export default function NotesClient({ tag }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

 const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      getNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
        tag,
      }),
    placeholderData: keepPreviousData,   
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        
        {tag !== undefined && (
          <Link href="/notes/filter/all" className={css.link}>
            All notes
          </Link>
        )}

      
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {isModalOpen && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <NoteForm
      onClose={() => setIsModalOpen(false)}
      onCreated={() => {
        setPage(1);
        setIsModalOpen(false);
      }}
    />
  </Modal>
)}
    </div>
  );
}
