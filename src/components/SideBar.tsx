import { useEffect, useState } from 'react';
import { api } from '../services/api';

import { Button } from '../components/Button';

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}
