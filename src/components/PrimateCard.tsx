import { Link } from 'react-router-dom';
import { PrimateEntry } from '@/types/primate';

interface PrimateCardProps {
  entry: PrimateEntry;
}

const PrimateCard = ({ entry }: PrimateCardProps) => {
  return (
    <Link 
      to={`/entry/${entry.id}`}
      className="group block border border-border hover:bg-accent transition-colors"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={entry.imageUrl} 
          alt={entry.name}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>
      <div className="p-3 space-y-1">
        <h3 className="font-mono text-sm font-medium">{entry.name}</h3>
        <p className="text-xs text-muted-foreground">{entry.species}</p>
        <p className="text-xs text-muted-foreground">{entry.title} ({entry.year})</p>
      </div>
    </Link>
  );
};

export default PrimateCard;
